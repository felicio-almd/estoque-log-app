<script setup lang="ts">
const route = useRoute()

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Gerar Planilha',
    icon: 'i-heroicons-document-plus',
    to: '/planilhas',
  },
]
</script>

<template>
  <aside
    class="pt-16 w-full transition-all duration-300"
  >
    <nav class="p-4 space-y-2 flex items-center justify-around">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors m-0" :class="[
          route.path === item.to
            ? 'bg-blue-50 text-amber-500'
            : 'text-amber-200 hover:bg-gray-100',
        ]"
      >
        <Icon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span class="font-medium">
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>
