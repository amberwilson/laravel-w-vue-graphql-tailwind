<template>
  <div
    :class="[colorMap500[color]]"
    class="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 rounded-sm cursor-pointer flex justify-center items-center text-white text-xl"
    @click="emit('changed', color)"
  >
    <span v-if="activeColor === color">✔</span>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { colorMap500 } from '../utils'

defineProps({
  color: { type: String, required: true },
  activeColor: { type: String, required: true },
})
const emit = defineEmits(['changed'])

</script>

<style scoped>

</style>
