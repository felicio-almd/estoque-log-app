<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

function handleSubmit() {
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    return
  }
  if (password.value !== confirmPassword.value) {
    return
  }
  if (!termsAccepted.value) {
    return
  }

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4 font-sans">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">
            Crie sua conta
          </h1>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              placeholder="Seu nome completo"
              required
            >
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              placeholder="seu@email.com"
              required
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none pr-12"
                placeholder="••••••••"
                required
              >
              <button
                type="button"
                class="absolute flex items-center right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar ou esconder a senha"
                @click="toggleShowPassword"
              >
                <UIcon v-if="showPassword" name="material-symbols:visibility-off-outline-rounded" class="size-5" />
                <UIcon v-else name="material-symbols:visibility-outline-rounded" class="size-5" />
              </button>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none pr-12"
                placeholder="••••••••"
                required
              >
              <button
                type="button"
                class="absolute flex items-center right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Mostrar ou esconder a confirmação da senha"
                @click="toggleShowConfirmPassword"
              >
                <UIcon v-if="showConfirmPassword" name="material-symbols:visibility-off-outline-rounded" class="size-5" />
                <UIcon v-else name="material-symbols:visibility-outline-rounded" class="size-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              Criando conta...
            </span>
            <span v-else>
              Cadastrar
            </span>
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-8">
          Já tem uma conta?
          <a href="/login" class="text-teal-600 hover:text-teal-700 font-medium">
            Faça Login
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
