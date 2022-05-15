<template>
  <div>
    <textarea
      v-model="title"
      class="shadow-card rounded-sm py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for this card..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref(null)
</script>

<style scoped>

</style>
