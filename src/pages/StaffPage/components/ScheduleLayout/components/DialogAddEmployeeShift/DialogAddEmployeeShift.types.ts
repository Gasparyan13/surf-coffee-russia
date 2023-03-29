import React from 'react'

import { Nullable } from '@common/types/Nullable'

import { PresetShiftViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { EDuty } from './types/enums'

export type AllShifts = { id: Nullable<number> } & Omit<
  Required<PresetShiftViewDto>,
  'id'
>

export type DialogFormData = {
  allShifts: AllShifts[]
  dutyMorning: EDuty
  dutyEvening: EDuty
  presetId: number | null
  shiftName: string
  shiftStart: string
  shiftEnd: string
  employee: number | null
  date: Date
}

export type Props = {
  onRefetch: () => Promise<void>
  setShowShiftDialog: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}
