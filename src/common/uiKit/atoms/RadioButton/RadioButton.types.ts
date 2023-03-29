export type Option = {
  id: string
  label: string
  value: string | number
}

export type Props = {
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  error?: boolean
  defaultChecked?: boolean
  value?: Option['value']
} & Omit<Option, 'value'>
