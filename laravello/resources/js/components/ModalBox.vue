<template>
  <transition name="appear">
    <div
      v-if="show"
      class="overlay fixed z-30 top-0 bottom-0 left-0 w-full h-full bg-black"
      @click.self="close"
    >
      <div
        class="w-full h-full bg-transparent flex justify-center items-center"
        @click.self="close"
      >
        <div
          :style="style"
          @click.self="close"
        >
          <slot>Modal content</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  width: { type: Number, default: 300 },
  height: { type: Number, default: 250 },
  show: { type: Boolean, default: true },
})
const emit = defineEmits(['closed'])

const style = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))

function close () {
  emit('closed')
}
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
