<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-700">
    <Navbar />
    <div class="flex pt-16">
      <Sidebar />
      <main class="flex-1 ml-64 p-8 transition-all duration-300">
        <slot />
      </main>
    </div>
  </div>
</template>
