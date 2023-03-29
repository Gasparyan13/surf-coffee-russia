export type CurrencyRangeValue = {
  min?: string
  max?: string
}

export type Props = {
  value: CurrencyRangeValue
  onChange: (value: CurrencyRangeValue) => void
  error?: boolean
  labelText?: string
  helperText?: string
  disabled?: boolean
}
