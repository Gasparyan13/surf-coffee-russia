import { UseFormSetValue } from 'react-hook-form'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { CounterpartiesData } from '../../ModalCounterparty.types'
import { EModalType } from '../../enums/modalType.enum'

export type Props = {
  isOpen: boolean
  onClose: () => void
  onSelectContractor: (arg: ContractorDto) => void
  contractorsData?: ContractorDto[]
  setModalType: (arg: EModalType) => void
  setValue: UseFormSetValue<CounterpartiesData>
}
