export default defineNuxtRouteMiddleware((to) => {
  const { userId } = useAuth()
  const publicRoutes = ['/login', '/register']

  if (!publicRoutes.includes(to.path) && !userId.value) {
    return navigateTo('/login')
  }

  if (to.path === '/login' && userId.value) {
    return navigateTo('/')
  }
})
