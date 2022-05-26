<template>
  <button
    class="header-btn"
    @click="showMenu = !showMenu"
  >
    Boards
  </button>
  <DropdownMenu
    :show="showMenu"
    @closed="showMenu = false"
  >
    <div class="text-gray-600 text-xs font-semibold mb-2 ml-2">
      BOARDS
    </div>
    <div v-if="boards">
      <router-link
        v-for="board in boards"
        :key="board.id"
        :to="{name: 'board', params: {id: board.id}}"
        :class="[`bg-${board.color}-100`]"
        class="flex m-2 rounded-sm opacity-100 hover:opacity-75 text-gray-700 cursor-pointer"
        @click="showMenu = false"
      >
        <div
          :class="[`bg-${board.color}-200`]"
          class="w-10 rounded-sm rounded-r-none"
        />
        <div
          class="p-2 font-bold"
        >
          {{ board.title }}
        </div>
      </router-link>
    </div>
    <div v-else-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      Oops... there was an error while retrieving your
      boards.
    </div>
  </DropdownMenu>
</template>

<script setup>
import DropdownMenu from '@components/DropdownMenu'
import { useUserStore } from '@stores/user.js'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import USER_BOARDS from '../gql/UserBoards.gql'

const user = useUserStore()

const showMenu = ref(false)

const { result, loading, error } = useQuery(USER_BOARDS, { ownerId: user.id })

const boards = computed(() => {
  return result.value?.userBoards ?? []
})

</script>

<style scoped>

</style>
