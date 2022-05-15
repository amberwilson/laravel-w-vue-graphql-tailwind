<template>
  <div
    class="shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2"
  >
    {{ card.title }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  card: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>

</style>
