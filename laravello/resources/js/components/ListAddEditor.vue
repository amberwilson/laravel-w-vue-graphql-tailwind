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
        class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none disabled:opacity-25"
        :disabled="cannotSave"
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
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, defineProps, ref } from 'vue'
import { directive as vClickAway } from 'vue3-click-away'
import LIST_ADD from '../gql/ListAdd.gql'

const props = defineProps({ board: { type: Object, required: true } })
const isEditing = ref(false)
const title = ref(null)

const vFocus = {
  mounted: (el) => el.focus(),
}

const { mutate: listAddMutation } = useMutation(LIST_ADD, {
  update: (cache, { data: { listAdd } }) => {
    cache.modify({
      id: cache.identify(props.board),
      fields: {
        lists (existingListsRefs = [], { readField }) {
          const newListRef = cache.writeFragment({
            data: listAdd,
            fragment: gql`
              fragment NewCardList on CardList {
                id
                title
              }
            `,
          })

          if (existingListsRefs.some(
            ref => readField('id', ref) === listAdd.id,
          )) {
            return existingListsRefs
          }

          return [...existingListsRefs, newListRef]
        },
      },
    })
  },
})

function hideEditor () {
  isEditing.value = false
  title.value = ''
}

function startEditing () {
  isEditing.value = true
}

const cannotSave = computed(() => title.value === null || title.value === '')

function createList () {
  listAddMutation({
    title: title.value,
    boardId: props.board.id,
  })

  hideEditor()
}
</script>

<style scoped>

</style>
