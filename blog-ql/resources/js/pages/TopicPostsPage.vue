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
      <span class="opacity-80">Oops it looks like we couldn't find that post. You can find lots of
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
      <div v-if="topic?.posts?.length > 0">
        <PostListItem
          v-for="post in topic.posts"
          :key="post.id"
          :post="post"
          class="mt-10"
        />
      </div>
      <div
        v-else-if="topic !== null"
        class="mt-5"
      >
        {{ topic.name }} doesn't have any posts.
      </div>
      <div
        v-else
        class="mt-5"
      >
        <span class="opacity-80">Oops it looks like we couldn't find that topic. You can find lots of
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


