<template>
  <div
    class="flex justify-between group shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 "
  >
    <div>{{ card.title }}</div>
    <div
      class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
    >
      <div
        class="text-gray-400 pr-2 hover:text-gray-500"
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
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable'
import { defineProps } from 'vue'
import CARD_DELETE from '../gql/CardDelete.gql'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

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
  cardDeleteMutation({ id: parseInt(props.card.id) })
}
</script>

<style scoped>

</style>
