<template>
  <div class="h-full flex flex-col items-stretch bg-purple-500">
    <div
      class="text-white flex justify-between items-center mb-2 bg-purple-600"
    >
      <div class="header ml-2 w-1/3">
        x
      </div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">
        Laravello
      </div>
      <div class="mr-2 w-1/3 flex justify-end">
        x
      </div>
    </div>

    <div
      class="h-full flex flex-1 flex-col items-stretch"
    >
      <div class="mx-4 mb-2 text-white font-bold text-lg">
        <span v-if="loading">Loading...</span><span
          v-else
        >{{ board.title }}</span>
      </div>
      <div
        v-if="board"
        class="flex flex-1 items-start overflow-x-auto mx-2"
      >
        <CardList
          v-for="list in board.lists"
          :key="list.id"
          :list="list"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardList from '@components/CardList'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const {
  result, // error,
  loading,
} = useQuery(gql`query getBoard($id: ID!) {
  board(id: $id) {
    id
    title
    lists {
      id
      title
      cards {
        id
        title
        order
      }
    }
  }
}
`, { id: 1 })

const board = computed(() => result.value?.board ?? null)

</script>

<style scoped>
.header {
  height: 40px;
}
</style>
