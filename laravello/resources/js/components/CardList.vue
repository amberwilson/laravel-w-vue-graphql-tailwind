<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">
        List Title
      </div>
    </div>

    <CardItem />
    <CardItem />
    <CardItem />
    <CardAddButton />
  </div>
</template>

<script setup></script>

<script>
import CardItem from "@components/CardItem";
import CardAddButton from "@components/CardAddButton";

export default {
  components: {
    CardAddButton,
    CardItem
  }
}
</script>
<style scoped>
.list {
  width: 250px;
  min-width: 250px;
}
</style>
