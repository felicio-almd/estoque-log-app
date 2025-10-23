<script setup lang="ts">
</script>

<template>
  <nav class="w-full flex justify-between items-center bg-gray-600 border-b border-gray-900 px-6 h-16 fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold text-white">
        Dashboard
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <UButton to="/login" color="primary">
          Entrar
        </UButton>
      </SignedOut>
    </div>
  </nav>
</template>
