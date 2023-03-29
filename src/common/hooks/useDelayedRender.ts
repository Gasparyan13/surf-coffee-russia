import { useLayoutEffect, useState } from 'react'

export const useDelayedRender = (timeout: number) => {
  const [rendered, setRendered] = useState(false)

  useLayoutEffect(() => {
    let mounted = true

    setTimeout(() => {
      if (mounted) {
        setRendered(true)
      }
    }, timeout)

    return () => {
      mounted = false
    }
  }, [])

  return { rendered }
}
