import { useCallback } from 'react'
import { NavigateOptions, useNavigate } from 'react-router'

export const useHandleRedirect = () => {
  const navigate = useNavigate()

  const handleRedirect = useCallback(
    (path: string, state?: NavigateOptions['state']) => {
      navigate(path, { state, replace: true })
    },
    [navigate],
  )

  return handleRedirect
}
