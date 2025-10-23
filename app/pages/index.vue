<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>tela index - Dashboard</h1>
    <div class="flex justify-around">
      <CardHome />
      <CardHome />
      <CardHome />
    </div>
  </div>
</template>
