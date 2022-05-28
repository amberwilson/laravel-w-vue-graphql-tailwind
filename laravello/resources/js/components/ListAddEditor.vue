<template>
  <div
    v-if="!isEditing"
    class="list bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75 text-black cursor-pointer"
    @click="startEditing"
  >
    + Add List
  </div>
  <div
    v-else
    v-click-away="hideEditor"
    class="list bg-gray-300 rounded-sm p-2"
  >
    <input
      v-model="title"
      v-focus
      type="text"
      placeholder="Enter list title..."
      class="rounded-sm border-blue-600 border-2 py-1 px-2 outline-none w-full text-gray-800 text-small"
      @keyup.esc="hideEditor"
      @keypress.enter="createList"
    >

    <div class="flex">
      <button
        class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none"
        @click="createList"
      >
        Add List
      </button>
      <div
        class="rounded-sm mt-2 ml-1 py-1 px-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none cursor-pointer"
        @click="hideEditor"
      >
        Cancel
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { directive as vClickAway } from 'vue3-click-away'

const isEditing = ref(false)
const title = ref(null)

const vFocus = {
  mounted: (el) => el.focus(),
}

function hideEditor () {
  isEditing.value = false
  title.value = ''
}

function startEditing () {
  isEditing.value = true
}

function createList () {
  hideEditor()

  console.log('save here', title.value)
}
</script>

<style scoped>

</style>
