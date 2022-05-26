<template>
  <transition name="appear">
    <div
      v-if="show"
      v-click-away="close"
      class="dropdown-menu absolute bg-gray-200 rounded-sm mt-2 text-sm text-gray-600 border-gray-200 shadow w-64 overflow-y-auto z-10 p-2"
    >
      <slot>Dropdown Menu Content</slot>
    </div>
  </transition>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { directive as vClickAway } from 'vue3-click-away'

defineProps({ 'show': { type: Boolean, required: true, default: false } })
const emit = defineEmits(['closed'])

function close () {
  emit('closed')
}
</script>

<style scoped>
.dropdown-menu {
  max-height: 80%;
}
</style>
