<script setup lang="ts">
const { userId } = useAuth()

if (userId.value) {
  navigateTo('/')
}
</script>

<template>
  <div class="grid place-items-center h-screen">
    <SignIn sign-up-url="/register" />
  </div>
</template>
