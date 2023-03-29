import { EnterpriseScheduleForDayViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { GeneralType } from '../../Table.types'

export type Props = {
  schedule: EnterpriseScheduleForDayViewDto[]
} & GeneralType
