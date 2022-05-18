<template>
  <div>
    <textarea
      ref="titleInput"
      v-model="title"
      class="shadow-card rounded-sm py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
      @keyup.esc="close"
    />
    <button
      class="rounded-sm py-1 px-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none"
      @click="saveCard"
    >
      {{ label }}
    </button>
    <button
      class="rounded-sm ml-1 py-1 px-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none"
      @click="cancel"
    >
      Cancel
    </button>
  </div>
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { defineEmits, defineProps, onMounted, ref } from 'vue'
import CARD_ADD from '../gql/CardAdd.gql'
import CARD_UPDATE from '../gql/CardUpdate.gql'

const props = defineProps({
  list: { type: Object, required: true },
  card: { type: Object, required: false, default: null },
})
const emit = defineEmits(['closed'])
const titleInput = ref(null)
const title = ref(null)
const label = ref('Save Card')

const { mutate: cardAddMutation } = useMutation(CARD_ADD, {
  update: (cache, { data: { cardAdd } }) => {
    cache.modify({
      id: cache.identify(props.list),
      fields: {
        cards (existingCardRefs = [], { readField }) {
          const newCardRef = cache.writeFragment({
            data: cardAdd,
            fragment: gql`
              fragment NewCard on Card {
                id
                title
              }
            `,
          })

          if (existingCardRefs.some(
            ref => readField('id', ref) === cardAdd.id,
          )) {
            return existingCardRefs
          }

          return [...existingCardRefs, newCardRef]
        },
      },
    })
  },
})

const { mutate: cardUpdateMutation } = useMutation(CARD_UPDATE)

onMounted(() => {
  titleInput.value.focus()
  if (props.card) {
    title.value = props.card.title
    label.value = 'Update Card'
  }
})

const nextOrder = () => props.list.cards.length + 1

function saveCard () {
  if (!props.card) {
    cardAddMutation({
      title: title.value,
      order: nextOrder(),
      listId: props.list.id,
    })
  } else {
    cardUpdateMutation({
      id: +props.card.id,
      title: title.value,
      order: props.card.order,
    })
  }
  close()
}

function cancel () {
  title.value = null
  close()
}

function close () {
  emit('closed')
}
</script>

<style scoped>

</style>
