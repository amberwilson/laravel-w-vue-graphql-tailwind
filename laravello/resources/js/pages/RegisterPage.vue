<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container mt-2 sm:mt-10 flex flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">
        <span>Laravello</span>
      </div>
      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        <ErrorList :errors="errors" />
        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Sign up to
          Laravello
        </div>
        <form @submit.prevent="register">
          <div class="w-full mb-4">
            <input
              v-model="email"
              type="text"
              placeholder="Enter email"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            >
          </div>
          <div class="w-full mb-4">
            <input
              v-model="name"
              type="text"
              placeholder="Enter full name"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            >
          </div>
          <div class="w-full mb-4">
            <input
              v-model="password"
              type="password"
              placeholder="Enter password"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            >
          </div>
          <div class="w-full mb-6">
            <button
              type="submit"
              class="rounded-sm px-4 py-2 text-sm bg-green-500 font-bold outline-none focus:outline-none hover:bg-opacity-75 w-full active:bg-green-600 text-white disabled:opacity-25"
            >
              Register
            </button>
          </div>
        </form>

        <div class="bg-gray-400 h-px w-full mb-6" />

        <div class="text-center text-sm">
          <router-link
            :to="{name: 'login'}"
            class="text-blue-600 hover:underline"
          >
            Already have an account? Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorList from '@components/ErrorList'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import REGISTER from '../gql/Register.gql'
import { graphQLErrors } from '../utils.js'

const email = ref()
const name = ref()
const password = ref()
const errors = ref([])

const router = useRouter()

const { mutate: registerMutation, onError, onDone } = useMutation(REGISTER)

onError((error) => errors.value = graphQLErrors(error))

onDone(() => {
  errors.value = []
  router.push({ name: 'board' })
})

function register () {
  registerMutation({
    email: email.value,
    name: name.value,
    password: password.value,
  })
}

</script>

<style scoped>
.container {
  width: 300px;
  max-width: 300px;
}

@media (min-width: 640px) {
  .container {
    width: 400px;
    max-width: 400px;
  }
}
</style>
