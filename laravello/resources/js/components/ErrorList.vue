<template>
  <div
    v-if="errors.length"
    class="p-2 bg-red-600 text-gray-100 rounded-sm mb-6 text-center"
  >
    <div
      v-for="(error, index) in errors"
      :key="index"
    >
      {{ error.message }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({ errors: { type: Array, required: true } })

</script>

<style scoped>

</style>
