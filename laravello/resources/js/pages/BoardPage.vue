<template>
  <div
    class="h-full flex flex-col items-stretch"
    :class="bgColor"
  >
    <div
      class="header text-white flex justify-between items-center mb-2"
    >
      <div
        class="ml-2 w-1/3"
      >
        <UserBoardsDropdown />
      </div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">
        Laravello
      </div>
      <div
        class="mr-2 w-1/3 flex justify-end"
      >
        <div
          v-if="user.id"
          class="flex items-center"
        >
          <div class="text-sm mr-2">
            {{ user.name }}
          </div>
          <button
            class="header-btn"
            @click="logout"
          >
            Logout
          </button>
        </div>
        <div
          v-else
          class="flex justify-end"
        >
          <button
            class="header-btn mr-1"
            @click="router.push({name: 'login'})"
          >
            Login
          </button>
          <button
            class="header-btn"
            @click="router.push({name: 'register'})"
          >
            Register
          </button>
        </div>
      </div>
    </div>

    <div
      class="h-full flex flex-1 flex-col items-stretch"
    >
      <div class="mx-4 mb-2 text-white font-bold text-lg">
        <span v-if="loading">Loading...</span><span v-else-if="error">Oops... that board couldn't be loaded</span><span
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

        <ListAddEditor />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardList from '@components/CardList'
import ListAddEditor from '@components/ListAddEditor'
import UserBoardsDropdown from '@components/UserBoardsDropdown'
import { useUserStore } from '@stores/user'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BOARD_QUERY from '../gql/BoardWithListsAndCards.gql'
import LOGOUT from '../gql/Logout.gql'
import { colorMap500, graphQlErrors } from '../utils.js'

const user = useUserStore()

const route = useRoute()
const router = useRouter()

const bgColor = computed(() => ({
  'bg-gray-500': loading.value,
  [colorMap500[board.value?.color]]: true,
}))

const {
  result, error, loading,
} = useQuery(BOARD_QUERY, () => ({
  id: route.params.id,
}))

const board = computed(() => result.value?.board ?? null)

const {
  mutate: logoutMutation,
  onError: onLogoutError,
  onDone: onLogoutDone,
} = useMutation(LOGOUT)

onLogoutError((error) => alert(graphQlErrors(error).map(err => err.message).join(' ')))

onLogoutDone(() => {
  user.clearUser()
  router.push({ name: 'login' })
})

function logout () {
  logoutMutation()
}
</script>

<style scoped>
.header {
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2)
}
</style>
