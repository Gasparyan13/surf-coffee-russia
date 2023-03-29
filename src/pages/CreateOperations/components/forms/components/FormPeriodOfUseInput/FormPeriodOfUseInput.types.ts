import React from 'react'

export type Props = {
  label?: string
  value: string
  onChange: (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  placeholder?: string
  error?: string
  disabled?: boolean
}
