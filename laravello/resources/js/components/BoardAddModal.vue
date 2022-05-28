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
          v-focus
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
        class="rounded-sm py-2 px-4 text-white hover:opacity-75 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
        :class="[colorMap500[color]]"
        :disabled="cannotCreate"
        @click="createBoard"
      >
        Create
      </button>
    </div>
  </ModalBox>
</template>

<script setup>
import BoardColor from '@components/BoardColor'
import ModalBox from '@components/ModalBox'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, defineEmits, defineProps, ref } from 'vue'
import BOARD_ADD from '../gql/BoardAdd.gql'
import { colorGrid, colorMap500 } from '../utils'

defineProps({
  show: { type: Boolean, default: true },
})
const emit = defineEmits(['closed'])

const vFocus = {
  mounted: (el) => el.focus(),
}

const color = ref('orange')
const title = ref(null)

function close () {
  emit('closed')
}

const cannotCreate = computed(() => title.value === null || title.value === '')

const {
  mutate: boardAddMutation,
} = useMutation(BOARD_ADD, {
  update: (cache, { data: { boardAdd } }) => {
    cache.modify({
      id: 'ROOT_QUERY',
      fields: {
        userBoards (existingBoardRefs = [], { readField }) {
          const newBoardRef = cache.writeFragment({
            data: boardAdd,
            fragment: gql`
              fragment NewBoard on Board {
                id
                title
                color
              }
            `,
          })

          if (existingBoardRefs.some(
            ref => readField('id', ref) === boardAdd.id,
          )) {
            return existingBoardRefs
          }

          return [...existingBoardRefs, newBoardRef]
        },
      },
    })

    emit('closed')
  },
})

function createBoard () {
  boardAddMutation({
    title: title.value,
    color: color.value,
  })
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
