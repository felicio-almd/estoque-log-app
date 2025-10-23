<script setup lang="ts">
const { userId } = useAuth()

if (userId.value) {
  navigateTo('/')
}
</script>

<template>
  <div class="grid place-items-center h-screen">
    <SignUp sign-in-url="/login" />
  </div>
</template>
