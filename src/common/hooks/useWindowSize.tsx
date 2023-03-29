import { useLayoutEffect, useState } from 'react'

type State = {
  width?: number
  height?: number
}

export const useWindowSize = (): State => {
  const [windowSize, setWindowSize] = useState<State>({
    width: undefined,
    height: undefined,
  })
  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
