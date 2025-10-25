<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const arquivosExportados = ref(0)

onMounted(() => {
  const saved = localStorage.getItem('arquivosExportados')
  arquivosExportados.value = saved ? Number(saved) : 0
})
</script>

<template>
  <div class="flex flex-col gap-10 text-black">
    <h1 class="md:pl-8 text-3xl font-bold max-md:text-center">
      Dashboard
    </h1>

    <div class="flex justify-around max-md:flex-col w-full max-md:gap-8">
      <div
        class="h-64 px-4 w-full md:w-[30%] rounded-2xl flex flex-col items-center justify-center border border-gray-500 bg-gradient-to-br from-cyan-900 to-cyan-700 text-white shadow-md"
      >
        <h2 class="text-2xl font-semibold">
          Bem-vindo 👋
        </h2>
        <p class="mt-2 text-center text-gray-200">
          Que bom te ver por aqui! Explore as novidades e continue acompanhando o progresso do app.
        </p>
      </div>

      <div
        class="h-64 w-full md:w-[30%] rounded-2xl flex flex-col items-center justify-center border border-gray-950 bg-gray-900 text-white shadow-md"
      >
        <h2 class="text-xl font-semibold mb-3 flex items-center gap-4">
          <Icon name="mdi:github" />
          GitHub
        </h2>
        <a
          href="https://github.com/felicio-almd"
          target="_blank"
          class="px-4 py-2 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          Perfil do Criador
        </a>
      </div>

      <div
        class="h-64 w-full md:w-[30%] rounded-2xl flex flex-col items-center justify-center border border-gray-950 bg-white shadow-md"
      >
        <h2 class="text-xl font-semibold mb-4">
          Métricas do App
        </h2>
        <div class="text-center space-y-2">
          <p><span class="font-bold text-cyan-800">{{ arquivosExportados }}</span> arquivos exportados</p>
        </div>
      </div>
    </div>
  </div>
</template>
