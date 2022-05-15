<template>
  <button
    class="rounded-sm w-full text-left p-2 text-gray-500 cursor-pointer hover:bg-gray-600 hover:text-gray-400 text-sm active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
    @click="addCard"
  >
    Add New Card
  </button>
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable'
import CardAdd from '../gql/CardAdd.gql'

const { mutate: cardAddMutation } = useMutation(CardAdd)

function addCard () {
  cardAddMutation({ title: 'Added through mutation', order: 1, listId: 1 })
}
</script>

<style scoped>

</style>
