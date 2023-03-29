import React from 'react'

import { SelectSingle } from '../../../../../../common/uiKit/components/SelectSingle/SelectSingle'
import * as Styled from './ScheduleHeader.styled'
import * as T from './ScheduleHeader.types'
import { currentYearOptions } from './constants'

export const ScheduleHeader: React.FC<T.Props> = ({ date, onChangeDate }) => {
  return (
    <Styled.Root>
      <Styled.MonthSelect>
        <SelectSingle
          menus={currentYearOptions}
          value={date}
          onChange={onChangeDate}
        />
      </Styled.MonthSelect>
    </Styled.Root>
  )
}
