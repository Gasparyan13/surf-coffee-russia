import { InputBaseProps } from '@mui/material'
import React from 'react'
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { CounterpartiesData } from '../../ModalCounterparty.types'

export type Props = {
  setActiveBtt: React.Dispatch<React.SetStateAction<boolean>>
  onNameChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    onChange: InputBaseProps['onChange'],
  ) => void
  isAddCounterparty: boolean
  control: Control<CounterpartiesData>
  errors: FieldErrors<CounterpartiesData>
  watch: UseFormWatch<CounterpartiesData>
  setValue: UseFormSetValue<CounterpartiesData>
  isValid: boolean
  handleCreateLegal: (e?: React.BaseSyntheticEvent) => Promise<void>
}
