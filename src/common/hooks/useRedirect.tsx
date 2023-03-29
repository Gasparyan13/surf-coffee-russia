export const useRedirect = () => {
  const isAuthenticated = localStorage.getItem('token')

  const shouldRedirect = !isAuthenticated

  return shouldRedirect
}
