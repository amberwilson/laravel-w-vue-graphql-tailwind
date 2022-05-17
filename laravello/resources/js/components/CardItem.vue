<template>
  <div
    class="flex justify-between group shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 "
  >
    <div>{{ card.title }}</div>
    <div
      class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"
    >
      <div class="text-gray-400 pr-2 hover:text-gray-500">
        E
      </div>
      <div class="text-gray-400 hover:text-gray-500">
        D
      </div>
    </div>
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
