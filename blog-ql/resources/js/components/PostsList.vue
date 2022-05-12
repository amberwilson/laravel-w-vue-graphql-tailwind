<template>
    <div v-if="error">Something went wrong...</div>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <PostListItem
            v-for="post in result.posts"
            :key="post.id"
            :post="post"
            class="mt-10"></PostListItem>
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
      name
    }
    topic {
      name
    }
  }
}`)
</script>
