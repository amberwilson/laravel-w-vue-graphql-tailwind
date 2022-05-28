<template>
  <ModalBox
    :show="show"
    @closed="close"
  >
    <div class="flex">
      <div
        class="rounded-sm p-4 text-black w-full mr-2"
        :class="[colorMap500[color]]"
      >
        <input
          v-model="title"
          type="text"
          placeholder="Add board title"
          class="title rounded-sm text-white outline-none p-2 font-bold w-full hover:opacity-50 placeholder-gray-100"
        >
      </div>
      <div>
        <div
          v-for="(row, i) in colorGrid"
          :key="i"
          class="flex justify-between mb-2"
        >
          <BoardColor
            v-for="(gridColor, j) in row"
            :key="j"
            :color="gridColor"
            :active-color="color"
            @changed="color = $event"
          />
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        class="rounded-sm py-2 px-4 text-white hover:opacity-75 cursor-pointer"
        :class="[colorMap500[color]]"
      >
        Create
      </button>
    </div>
  </ModalBox>
</template>

<script setup>
import BoardColor from '@components/BoardColor'
import ModalBox from '@components/ModalBox'
import { defineEmits, defineProps, ref } from 'vue'
import { colorGrid, colorMap500 } from '../utils'

defineProps({
  show: { type: Boolean, default: true },
})
const emit = defineEmits(['closed'])
const color = ref('orange')
const title = ref(null)

function close () {
  emit('closed')
}

</script>

<style scoped>
.title {
  background-color: hsla(0, 0%, 100%, 0)
}

.title:hover, .title:focus {
  background-color: hsla(0, 0%, 100%, 0.2)
}
</style>
