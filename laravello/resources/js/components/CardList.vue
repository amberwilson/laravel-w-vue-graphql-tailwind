<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">
        {{ list.title }}
      </div>
    </div>

    <CardItem
      v-for="card in list.cards"
      :key="card.id"
      :card="card"
    />
    <CardEditor
      v-if="isEditing"
      :list="list"
      @closed="closeEditor"
    />
    <CardAddButton
      v-else
      @click="isEditing = true"
    />
  </div>
</template>

<script setup>
import CardAddButton from '@components/CardAddButton'
import CardEditor from '@components/CardEditor'
import CardItem from '@components/CardItem'
import { defineProps, ref } from 'vue'

defineProps({
  list: {
    type: Object,
    required: true,
  },
})

const isEditing = ref(false)

function closeEditor () {
  isEditing.value = false
}
</script>
<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>
