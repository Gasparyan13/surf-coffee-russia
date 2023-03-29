import { css } from '@emotion/react'

import styled from '@common/styled'

const Root = styled.div`
  width: 100%;
`

const WorkingDayTitle = styled.div`
  font-family: Fira Sans;
  width: 382px;
  height: 46px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.colors.blackDark};
`

export const buttonShiftsCSS = css`
  && {
    width: 302px;
  }
`

const Shifts = styled.div`
  width: 350px;
  border: 1px solid ${(props) => props.theme.colors.grey};
  height: 720px;
  position: relative;
  padding-left: 24px;
  padding-top: 24px;
  border-radius: 16px;
`

const WorkingDay = styled.div`
  width: 382px;
  height: 720px;
  padding: 40px 40px;
  position: relative;
  background: ${(props) => props.theme.colors.grey};
  border-radius: 16px;
`

export const Styled = {
  Root,
  WorkingDayTitle,
  Shifts,
  WorkingDay,
}
