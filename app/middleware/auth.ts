export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/login', '/register']

  if (!publicRoutes.includes(to.path) && !isAuthenticated.value) {
    return navigateTo('/login')
  }

  if (to.path === '/login' && isAuthenticated.value) {
    return navigateTo('/')
  }
})
