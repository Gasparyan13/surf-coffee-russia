import styled from '@common/styled'

import * as T from './RadioButton.types'

const RADIO_BUTTON_SIZE = 16
const OFFSET_INNER_RADIO_BUTTON = 2

export const Label = styled.label<{ $disabled?: T.Props['disabled'] }>`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 33px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  user-select: none;
`

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  left: 0;
  cursor: pointer;
`

export const Radio = styled.span<{ $error?: T.Props['error'] }>`
  position: absolute;
  left: 4px;
  width: ${RADIO_BUTTON_SIZE}px;
  height: ${RADIO_BUTTON_SIZE}px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.critical : theme.colors.asphaltLight};

  &:after {
    content: '';
    width: ${RADIO_BUTTON_SIZE / 2}px;
    height: ${RADIO_BUTTON_SIZE / 2}px;
    position: absolute;
    top: ${OFFSET_INNER_RADIO_BUTTON}px;
    left: ${OFFSET_INNER_RADIO_BUTTON}px;
    display: none;
    border-radius: 50%;
  }

  Input:checked ~ & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  Input:checked ~ &:after {
    display: block;
    background-color: ${({ theme }) => theme.colors.black};
  }

  Label:hover & {
    border-color: ${({ theme, $error }) =>
      $error ? '' : theme.colors.asphalt};
  }

  Label:hover Input:checked ~ & {
    border-color: ${({ theme }) => theme.colors.asphalt};
  }

  Label:hover Input:checked ~ &:after {
    background-color: ${({ theme }) => theme.colors.asphalt};
  }

  Label:active & {
    border-color: ${({ theme }) => theme.colors.wetAsphalt};
    background-color: ${({ theme }) => theme.colors.wetAsphalt};
  }

  Label:active Input:checked ~ &:after {
    background-color: ${({ theme }) => theme.colors.white};
  }

  Input:disabled ~ & {
    background-color: ${({ theme }) => theme.colors.grey};
    border-color: ${({ theme }) => theme.colors.grey};
  }

  Input:disabled ~ &:after {
    background-color: ${({ theme }) => theme.colors.pencil};
  }
`
