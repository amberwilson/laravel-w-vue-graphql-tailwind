<template>
    <div class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-10">
        <h2 class="text-4xl">Post List Page</h2>
        <p v-if="error">Something went wrong...</p>
        <p v-if="loading">Loading...</p>
        <p v-else v-for="post in result.posts"
           :key="post.id">
            {{ post.title }}
        </p>
    </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const {
    result,
    loading,
    error,
} = useQuery(gql`query getPosts {posts{id title}}`)
</script>

<style scoped>

</style>
