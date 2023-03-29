import { OperationsReportUrlSearchParams } from '../components/OperationsReport/constants/urlSearchParams'

export const getEmptyFiltersArray = () => [
  {
    key: OperationsReportUrlSearchParams.articleId,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.articleName,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.contractorId,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.contractorName,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.maxAmount,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.minAmount,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.operationKind,
    value: null,
  },
  {
    key: OperationsReportUrlSearchParams.operationType,
    value: null,
  },
]

export const getNumberOfActiveFilters = (
  filterValues: (string | null | boolean)[],
): number => filterValues.filter((v) => !!v).length
