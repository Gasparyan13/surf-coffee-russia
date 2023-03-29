import { OperationGeneralView } from '@rtkApi/modules/__generated__/financial'

const getIsMatches = (searchValue: string, name: string | undefined): boolean =>
  name ? name.toLowerCase().includes(searchValue.toLowerCase()) : false

export const getFilteredOperations = (
  operations: OperationGeneralView[],
  searchValue: string,
) => {
  return operations.filter(
    (operation) =>
      getIsMatches(searchValue, operation.contractorName) ||
      getIsMatches(searchValue, operation.budgetItemName) ||
      getIsMatches(searchValue, operation.productName),
  )
}
