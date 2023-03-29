import { RefetchContractorsHandlerType } from '@components/ModalCounterparty/ModalCounterparty.types'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

export type CommonProps = {
  onClose: () => void
  contractorsData?: ContractorDto[]
  refetchContractors: RefetchContractorsHandlerType
}
