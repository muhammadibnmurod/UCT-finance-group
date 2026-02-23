export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Global auth middleware', to, from);
  const isLoggedIn = !!useCookie('access_token').value;

  if (!isLoggedIn && to.path !== '/auth') {
    return navigateTo('/auth');
  }
});
