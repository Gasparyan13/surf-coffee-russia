import React from 'react'
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import {
  CounterpartiesData,
  RefetchContractorsHandlerType,
} from '../../ModalCounterparty.types'
import { EModalType } from '../../enums/modalType.enum'

export type Props = {
  isOpen: boolean
  isValid: boolean
  isDirty: boolean
  isEditContractorIndividual: boolean
  isAddCounterparty: boolean
  isEditContractorLegal: boolean
  onClose: () => void
  onRefetch: RefetchContractorsHandlerType
  onSelectContractor: (arg: ContractorDto) => void
  setPrevDeleteModalType: React.Dispatch<
    React.SetStateAction<EModalType | null>
  >
  setModalType: (arg: EModalType) => void
  modalType: EModalType
  control: Control<CounterpartiesData>
  errors: FieldErrors<CounterpartiesData>
  watch: UseFormWatch<CounterpartiesData>
  setValue: UseFormSetValue<CounterpartiesData>
  handleSubmit: UseFormHandleSubmit<CounterpartiesData>
  reset: UseFormReset<CounterpartiesData>
}
