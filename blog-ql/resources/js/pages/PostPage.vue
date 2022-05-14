<template>
  <div>
    <div class="container mx-auto px-4-w-full wd:w-3/4 lg:w-3/5 xl:w-1/2 mt-20">
      <div v-if="error">
        Something went wrong...
      </div>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div class="text-lg text-gray-600">
          By {{ post.author.name }} in {{ post.topic.name }} • 3
          hour ago
        </div>

        <h1 class="text-5xl mt-10 font-bold mb-12">
          {{ post.title }}
        </h1>

        <p class="text-gray-700 pb-3 mb-12 whitespace-pre-line">
          {{ post.content }}
        </p>

        <div class="mb-24 flex">
          <div class="m5-6">
            <img
              :src="avatarPath"
              alt="Author avatar"
              class="w-16 h-16 rounded-full"
            >
          </div>
          <div class="flex flex-col justify">
            <div class="text-xl text-gray-600">
              Written by {{ post.author.name }}
            </div>
            <div class="text-gray-600">
              Published in {{ post.topic.name }} on May 13, 2022
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const {
  result,
  loading,
  error,
} = useQuery(gql`query getPost($postId: ID!) {
  post(id: $postId) {
    id
    title
    content
    created_at
    author {
      name
      avatar
    }
    topic {
      name
    }
  }
}`, { postId: route.params.id })

const post = computed(() => result.value?.post ?? null)

const avatarPath = computed(() => `/storage/faces/${result.value.post.author.avatar}`)
</script>

<style scoped>

</style>
