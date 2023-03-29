import { Control, FieldErrors, FieldPath, FieldValues } from 'react-hook-form'

export type ContractorBaseProps<T extends { [k: string]: FieldValues }> = {
  control: Control<T>
  name: FieldPath<T>
  errors: FieldErrors<T>
}

export type Props<T extends { [k: string]: FieldValues }> =
  ContractorBaseProps<T> & {
    isAddContractorWorker: boolean
  }
