<template>
  <div class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-10">
    <h2 class="text-4xl">
      <router-link
        :to="{name: 'index'}"
        class="text-gray-600 hover:underline"
      >
        All Posts
      </router-link>
      <span class="text-gray-600">/</span>
      {{
        user?.name ? `Posts by ${user?.name}` : loading ? '...' : 'Author Not Found'
      }}
    </h2>
    <div class="mt-5">
      <div v-if="error">
        <span class="opacity-80">Oops it looks like we couldn't find that author. You can find lots of
          interesting stuff on the</span>
        <router-link
          :to="{name: 'index'}"
          class="hover:underline"
        >
          home page
        </router-link>
        .
      </div>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="user?.posts?.length > 0">
          <PostListItem
            v-for="post in user.posts"
            :key="post.id"
            :post="post"
            class="mt-10"
          />
        </div>
        <div v-else-if="user !== null">
          {{ user.name }} doesn't have any posts.
        </div>
        <div v-else>
          <span class="opacity-80">Oops it looks like we couldn't find that author. You can find lots of
            interesting stuff on the</span>
          <router-link
            :to="{name: 'index'}"
            class="hover:underline"
          >
            home page
          </router-link>
          .
        </div>
      </div>
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
} = useQuery(gql`query getUser ($userId: ID!) {
  user(id: $userId) {
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
}`, { userId: route.params.id })

const user = computed(() => result.value?.user ?? null)
</script>


