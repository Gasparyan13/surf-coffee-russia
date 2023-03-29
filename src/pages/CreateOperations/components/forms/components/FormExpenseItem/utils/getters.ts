import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import { SelectedUsedCapitalAssests } from '../../FormExpenses/FormExpenses.types'

export const getOptions = (
  options: AutocompleteItem[] | undefined,
  selectedOptions: SelectedUsedCapitalAssests | undefined,
  denominationValue: string,
  disabled: boolean,
): AutocompleteItem[] | [] => {
  if (!options || !selectedOptions) return []

  const newOptions = options.reduce<AutocompleteItem[]>(
    (acc, capitalAssets) => {
      if (
        !selectedOptions.some(
          (selectedValue) => selectedValue === capitalAssets.value,
        ) ||
        capitalAssets.value === denominationValue
      ) {
        acc.push(capitalAssets)
      }

      return acc
    },
    [],
  )

  if (disabled) {
    newOptions.push({
      value: denominationValue,
      label: denominationValue,
      key: denominationValue,
    })
  }

  return newOptions
}
