import { Role } from '@store/deprecated/modules/app/types'

import { AddCSSprop } from '../../../types/Generics'

export type Props = AddCSSprop<{
  workerName: string
  role: Role
  planHours: number
  variant?: 'short' | 'normal'
  width?: number
  height?: number
  factHours?: number
  isOnDuty?: boolean
}>
