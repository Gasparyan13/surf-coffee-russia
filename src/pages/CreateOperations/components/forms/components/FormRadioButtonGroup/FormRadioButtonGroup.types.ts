import { Props as RadioButtonProps } from '@uiKit/components/RadioButtonGroup/RadioButtonGroup.types'

export type Props = Pick<
  RadioButtonProps,
  'name' | 'options' | 'label' | 'onChange' | 'error' | 'defaultValue'
>
