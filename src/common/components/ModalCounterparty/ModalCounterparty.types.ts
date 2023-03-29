import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

export type RefetchContractorsHandlerType = () => Promise<
  ContractorDto[] | undefined
>

export type Props = {
  onClose: () => void
  open: boolean
  onSelectContractor: (arg: ContractorDto) => void
  refetchContractors: RefetchContractorsHandlerType
  contractorsData?: ContractorDto[]
}

export type CounterpartiesData = {
  readOnly: boolean
  id?: number
  searchAlias: string
  alias: string
  aliasEntity: string
  inn: string
  typeSwitch: boolean
  orgName: string
  kpp: string
  ogrn: string
}
