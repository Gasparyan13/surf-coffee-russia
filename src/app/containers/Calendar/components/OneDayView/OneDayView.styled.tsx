import styled from '@common/styled'

import { calendarGridCSS } from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayCalendar/WorkingDayCalendar.styled'

const Root = styled.div`
  overflow: scroll;
  padding: 2px 0 0;
  overflow-x: hidden;
  ${calendarGridCSS}
`

const HoursBlock = styled.div`
  margin-top: -12px;
`

const Hour = styled.div`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.colors.wetAsphalt};
  margin-bottom: 29px;

  &:nth-of-type(4) {
    margin-bottom: 22px;
  }
  &:nth-of-type(15) {
    margin-bottom: 22px;
  }

  &:nth-of-type(19) {
    margin-bottom: 22px;
  }
`

export const Styled = { Root, Hour, HoursBlock }
