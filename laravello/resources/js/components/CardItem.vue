<template>
  <div>
    <div
      v-if="!isEditing"
      class="flex justify-between group shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 "
    >
      <div>{{ card.title }}</div>
      <div
        class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
      >
        <div
          class="text-gray-400 pr-2 hover:text-gray-500"
          @click="cardEdit"
        >
          E
        </div>
        <div
          class="text-gray-400 hover:text-gray-500"
          @click="cardDelete"
        >
          D
        </div>
      </div>
    </div>
    <div
      v-else
      class="mb-2"
    >
      <CardEditor
        :list="card.list"
        :card="card"
        @closed="closeEditor"
      />
    </div>
  </div>
</template>

<script setup>
import CardEditor from '@components/CardEditor'
import { useMutation } from '@vue/apollo-composable'
import { defineProps, ref } from 'vue'
import CARD_DELETE from '../gql/CardDelete.gql'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})
const isEditing = ref(false)

const { mutate: cardDeleteMutation } = useMutation(CARD_DELETE, {
  update: (cache, { data: { cardDelete } }) => {
    cache.modify({
      id: cache.identify(props.card.list),
      fields: {
        cards (existingCardRefs = [], { readField }) {
          if (existingCardRefs.some(
            ref => readField('id', ref) === cardDelete.id,
          )) {
            return existingCardRefs.filter((cardRef) => readField('id', cardRef) !== cardDelete.id)
          }
        },
      },
    })
  },
})

const cardDelete = () => {
  cardDeleteMutation({ id: +props.card.id })
}
const cardEdit = () => {
  isEditing.value = true
}
const closeEditor = () => {
  isEditing.value = false
}
</script>

<style scoped>

</style>
