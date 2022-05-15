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
    <CardAddButton />
  </div>
</template>

<script setup>
import CardAddButton from '@components/CardAddButton'
import CardItem from '@components/CardItem'
import { defineProps } from 'vue'

defineProps({
  list: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>
