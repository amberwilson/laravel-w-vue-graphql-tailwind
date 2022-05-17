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
      Save Card
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

const props = defineProps({ list: { type: Object, required: true } })
const emit = defineEmits(['closed'])
const titleInput = ref(null)
const title = ref(null)

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

onMounted(() => {
  titleInput.value.focus()
})

const nextOrder = () => props.list.cards.length + 1

function saveCard () {
  cardAddMutation({
    title: title.value,
    order: nextOrder(),
    listId: props.list.id,
  })
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
