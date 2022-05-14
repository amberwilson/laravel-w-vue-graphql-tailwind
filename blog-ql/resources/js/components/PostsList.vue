<template>
  <div>
    <div v-if="error">
      Something went wrong...
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <div v-if="result?.posts?.length > 0">
        <PostListItem
          v-for="post in result.posts"
          :key="post.id"
          :post="post"
          class="mt-10"
        />
      </div>
      <div v-else>
        Our first posts are still in the works. Please stay tuned.
      </div>
    </div>
  </div>
</template>
<script setup>
import PostListItem from '@components/PostListItem'

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const {
  result,
  loading,
  error,
} = useQuery(gql`query getPosts {
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
}`)
</script>
