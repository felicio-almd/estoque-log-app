export function useAuth() {
  const token = useState<string | null>('auth-token', () => null)
  const user = useState<any>('auth-user', () => null)

  const login = async (email: string, password: string) => {
    try {
      if (process.client) {
        localStorage.setItem('auth-token', mockToken)
        localStorage.setItem('auth-user', JSON.stringify(mockUser))
      }

      return { success: true }
    }
    catch (error) {
      return { success: false, error: 'Erro ao fazer login' }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null

    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
    }
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated,
  }
}
