import React from 'react'
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { CounterpartiesData } from '../../ModalCounterparty.types'

export type Props = {
  handleCreateIndividual: (e?: React.BaseSyntheticEvent) => Promise<void>
  handleCreateLegal: (e?: React.BaseSyntheticEvent) => Promise<void>
  setActiveBtt: React.Dispatch<React.SetStateAction<boolean>>
  setHasChangedInEditMode: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void
  isEditContractorIndividual: boolean
  isAddCounterparty: boolean
  isEditContractorLegal: boolean
  control: Control<CounterpartiesData>
  errors: FieldErrors<CounterpartiesData>
  watch: UseFormWatch<CounterpartiesData>
  setValue: UseFormSetValue<CounterpartiesData>
  isValid: boolean
}
