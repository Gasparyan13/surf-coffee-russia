import React from 'react'

export type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  label?: string
  value?: string | number
  variant?: 'middle' | 'basic'
  disabled?: boolean
  checked?: boolean
}
