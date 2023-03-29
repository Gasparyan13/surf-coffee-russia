import { EnterpriseWorkerViewDto } from '@rtkApi/modules/__generated__/enterprise'

export type Props = {
  workersData?: EnterpriseWorkerViewDto[]
  onOpenModal: () => void
}
