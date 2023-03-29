import { Props as UiKitButtonProps } from '../../../Button/Button.types'

export type Props = {
  onClick: () => void
  text: string
  disabled?: boolean
  isVisible?: boolean
  color?: UiKitButtonProps['color']
}
