import {
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
} from '@mui/material'

import styled from '@common/styled'

import { Typography } from '@uiKit'

export const Button = styled(MuiButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.asphaltSuperLight};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`

export const ButtonGroup = styled(MuiButtonGroup)`
  .MuiButtonGroup-grouped:not(:last-of-type) {
    border-color: ${({ theme }) => theme.colors.asphaltSuperLight};
    border-right: none;
    &:hover {
      > span:first-of-type {
        color: ${({ theme }) => theme.colors.asphalt};
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`

export const FiltersCounter = styled(Typography)`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.asphalt};
`
