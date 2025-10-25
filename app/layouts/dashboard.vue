<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Navbar />
    <div class="md:hidden">
      <MobileNav />
    </div>
    <div class="flex flex-1 md:pt-16">
      <Sidebar />
      <main class="flex-1 md:ml-64 p-4 transition-all duration-300">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
