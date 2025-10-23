<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  nome: string
  valor: number
  expanded: boolean
}

interface Moto {
  modelo: string
}

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})

const nomeCliente = ref<string>('')
const motos = ref<Moto[]>([{ modelo: '' }])
const itens = ref<Item[]>([])

function adicionarMoto() {
  motos.value.push({ modelo: '' })
}

function removerMoto(index: number) {
  if (motos.value.length > 1) {
    motos.value.splice(index, 1)
  }
}

function adicionarItem() {
  itens.value.push({
    nome: `Item ${itens.value.length + 1}`,
    valor: 0,
    expanded: false,
  })
}

function removerItem(index: number) {
  itens.value.splice(index, 1)
}

function toggleItem(index: number) {
  const item = itens.value[index]
  if (item) {
    item.expanded = !item.expanded
  }
}

function formatarValor(valor: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function exportar() {
}
</script>

<template>
  <div class="max-w-3xl mx-auto text-black">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <button
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          @click="$router.back()"
        >
          <Icon name="i-heroicons-arrow-left" class="w-5 h-5" />
        </button>
        <h1 class="text-xl font-semibold text-gray-900">
          Cadastrar Nota
        </h1>
      </div>

      <!-- Nome do Cliente -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nome do Cliente*
        </label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite o nome do cliente"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
      </div>

      <!-- Motos -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Motos
        </label>
        <div class="space-y-3">
          <div
            v-for="(moto, index) in motos"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="moto.modelo"
              type="text"
              :placeholder="`Moto ${index + 1}`"
              class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
            <button
              v-if="motos.length > 1"
              class="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              @click="removerMoto(index)"
            >
              <Icon name="i-heroicons-trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          class="mt-3 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
          @click="adicionarMoto"
        >
          <Icon name="i-heroicons-plus" class="w-4 h-4" />
          Adicionar Moto
        </button>
      </div>

      <!-- Itens -->
      <div class="mb-8">
        <h3 class="text-base font-semibold text-gray-900 mb-4">
          Itens
        </h3>
        <div class="space-y-2">
          <div
            v-for="(item, index) in itens"
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <!-- Header do Item -->
            <div
              class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              @click="toggleItem(index)"
            >
              <div class="flex items-center gap-3">
                <span class="font-medium text-gray-900">{{ item.nome }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm text-gray-600">
                  Valor Total: <span class="font-semibold text-gray-900">{{ formatarValor(item.valor) }}</span>
                </span>
                <Icon
                  :name="item.expanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                  class="w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            <!-- Conteúdo Expandido -->
            <div v-if="item.expanded" class="p-4 pt-0 border-t border-gray-100">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Nome do Item
                  </label>
                  <input
                    v-model="item.nome"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    Valor (R$)
                  </label>
                  <input
                    v-model.number="item.valor"
                    type="number"
                    step="0.01"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                </div>
              </div>
              <button
                class="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                @click.stop="removerItem(index)"
              >
                Remover Item
              </button>
            </div>
          </div>
        </div>

        <button
          class="mt-3 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
          @click="adicionarItem"
        >
          <Icon name="i-heroicons-plus" class="w-4 h-4" />
          Adicionar Item
        </button>
      </div>

      <!-- Botão Exportar -->
      <div class="flex justify-center pt-6 border-t border-gray-200">
        <button
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          @click="exportar"
        >
          <Icon name="i-heroicons-arrow-down-tray" class="w-5 h-5" />
          Exportar Tudo
        </button>
      </div>
    </div>
  </div>
</template>
