import { SerializedStyles } from '@emotion/react'

export type AddCSSprop<T> = T & { css?: SerializedStyles }
export type AddIDprop<T> = T & { id: number }
export type AddCSSKeyProps<T> = T & {
  css?: SerializedStyles
  key: string | number
}
