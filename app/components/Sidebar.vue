<script setup lang="ts">
import { ref } from 'vue'

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

const isCollapsed = ref(false)
</script>

<template>
  <aside
    class="max-md:hidden fixed left-0 top-16 md:h-[calc(100vh-4rem)] bg-gray-600 border-r border-gray-900 transition-all duration-300" :class="[
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Toggle Button -->
    <button
      class="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      @click="isCollapsed = !isCollapsed"
    >
      <UIcon v-if="isCollapsed" name="material-symbols:chevron-right" class="text-black" />
      <UIcon v-else name="material-symbols:chevron-left" class="text-black" />
    </button>

    <nav class="p-4 space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" :class="[
          route.path === item.to
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100',
          isCollapsed && 'justify-center',
        ]"
      >
        <Icon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </aside>
</template>
