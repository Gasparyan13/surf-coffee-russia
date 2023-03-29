import { Option } from '../../atoms/RadioButton/RadioButton.types'

export type Props = {
  options: Option[]
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label?: string
  defaultValue?: Option['id']
  variant?: 'horizontal' | 'vertical'
  error?: string
  disabled?: boolean
}
