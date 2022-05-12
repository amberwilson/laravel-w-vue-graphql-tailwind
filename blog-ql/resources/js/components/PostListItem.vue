<template>
    <div>
        <router-link :to="{name: 'post', params: {id: post.id}}">
            <h4 class="text-2xl pb-3 font-semibold">{{ post.title }}</h4>
        </router-link>

        <p class="text-gray-600 pb-3">{{ post.lead }}</p>
        <div class="text-sm text-gray-600" v-html="authoredAt"></div>
    </div>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
    post: { type: Object, required: true }
})

const authoredAt = computed(() => {
    return `By ${props.post.author.name}&nbsp;in ${props.post.topic.name}&nbsp;• 3 hours ago`
})
</script>

<style scoped>

</style>
