import {
  ContractorDto,
  ContractorCreateDto,
} from '@rtkApi/modules/__generated__/prepayment'

type Contractor = ContractorDto & ContractorCreateDto

export const CONTRACTOR_INDIVIDUAL: Contractor = {
  id: 528,
  alias: 'Тест',
  enterpriseId: 26,
  type: 'individual',
}

export const CONTRACTOR_LEGAL: Contractor = {
  id: 518,
  alias: 'Альфа банк',
  orgName: 'АО "АЛЬФА-БАНК"',
  ogrn: '1027700067328',
  inn: '7728168971',
  kpp: '770801001',
  enterpriseId: 26,
  type: 'legal',
}

export const ContractorsMock: Record<string, Contractor> = {
  'Альфа банк': CONTRACTOR_LEGAL,
  Тест: CONTRACTOR_INDIVIDUAL,
}
