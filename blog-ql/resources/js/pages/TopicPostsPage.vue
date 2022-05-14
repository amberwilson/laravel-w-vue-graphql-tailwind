<template>
  <div class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-10">
    <h2 class="text-4xl">
      <router-link
        :to="{name: 'index'}"
        class="text-gray-600 hover:underline"
      >
        All Posts
      </router-link>
      <span class="text-gray-600">/</span> {{ topic?.name ?? '...' }}
    </h2>
    <div v-if="error">
      Something went wrong...
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <PostListItem
        v-for="post in topic.posts"
        :key="post.id"
        :post="post"
        class="mt-10"
      />
    </div>
  </div>
</template>

<script setup>
import PostListItem from '@components/PostListItem'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const {
  result,
  loading,
  error,
} = useQuery(gql`query getTopic ($slug: String!) {
  topic(slug: $slug) {
    id
    name
    posts {
      id
      title
      lead
      created_at
      author {
        id
        name
      }
      topic {
        id
        name
        slug
      }
    }
  }
}`, { slug: route.params.slug })

const topic = computed(() => result.value?.topic ?? null)
</script>


