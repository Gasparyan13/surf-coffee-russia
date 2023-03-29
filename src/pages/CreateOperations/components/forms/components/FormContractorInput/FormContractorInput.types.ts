import { FieldValues } from 'react-hook-form'

import { ContractorBaseProps } from '../FormContractorField'

export type Props<T extends { [k: string]: FieldValues }> =
  ContractorBaseProps<T>
