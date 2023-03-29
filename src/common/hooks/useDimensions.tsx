import { useCallback, useLayoutEffect, useState } from 'react'

import { Nullable } from '../types/Nullable'

type DimensionObject = {
  width: number
  height: number
  top: number
  left: number
  x: number
  y: number
  right: number
  bottom: number
}

type UseDimensionsHook = [
  (node: HTMLElement | null) => void,
  DimensionObject,
  HTMLElement | null,
]

type UseDimensionsArgs = {
  liveMeasure?: boolean
}

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect()

  return {
    width: rect.width,
    height: rect.height,
    top: rect.x ?? rect.top,
    left: rect.y ?? rect.left,
    x: rect.x ?? rect.left,
    y: rect.y ?? rect.top,
    right: rect.right,
    bottom: rect.bottom,
  }
}

export const useDimensions = ({
  liveMeasure = true,
}: UseDimensionsArgs = {}): UseDimensionsHook => {
  const [dimensions, setDimensions] = useState<DimensionObject>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  })
  const [node, setNode] = useState<Nullable<HTMLElement>>(null)

  const ref = useCallback((newNode: Nullable<HTMLElement>) => {
    setNode(newNode)
  }, [])

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node)),
        )
      measure()

      if (liveMeasure) {
        window.addEventListener('resize', measure)
        window.addEventListener('scroll', measure)

        return () => {
          window.removeEventListener('resize', measure)
          window.removeEventListener('scroll', measure)
        }
      }
    }
  }, [node])

  return [ref, dimensions, node]
}
