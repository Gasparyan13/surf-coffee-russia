import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

const CHECKBOX_SIZE = 16

export const Root = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const Input = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  margin: 0;
`

export const Label = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  width: ${CHECKBOX_SIZE}px;
  height: ${CHECKBOX_SIZE}px;
`

const disabledCheckedAfter = css`
  ${Input}:disabled:checked + &::after {
    border: 4px solid ${theme.colors.pencil};
    box-sizing: border-box;
    background: ${theme.colors.pencil};
    top: 0;
    left: 0;
  }
`

const checkedDefaultCheckbox = css`
  cursor: pointer;
  ${Input}:checked + & {
    border-color: ${theme.colors.black};
  }

  ${Input}:checked + &:hover {
    border-color: ${theme.colors.wetAsphalt};
  }

  ${Input}:checked + &::after {
    display: block;
    top: 2px;
    left: 2px;
    width: ${CHECKBOX_SIZE / 2}px;
    height: ${CHECKBOX_SIZE / 2}px;
    border-radius: 2px;
    background: ${theme.colors.black};
  }

  ${Input}:checked + &:hover::after {
    background: ${theme.colors.wetAsphalt};
  }

  ${Input}:checked + &:active {
    border: 4px solid ${theme.colors.wetAsphalt};
  }

  ${Input}:checked + &:active::after {
    background: ${theme.colors.white};
    top: 0;
    left: 0;
  }
`

export const MiddleCheckbox = styled.span`
  width: ${CHECKBOX_SIZE}px;
  height: ${CHECKBOX_SIZE}px;
  position: relative;
  border: 2px solid ${(props) => props.theme.colors.black};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 2px;
    width: ${CHECKBOX_SIZE / 2}px;
    height: 2px;
    border-radius: 2px;
    background: ${(props) => props.theme.colors.black};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.asphalt};

    &:after {
      background: ${(props) => props.theme.colors.asphalt};
    }
  }

  &:active {
    background: ${(props) => props.theme.colors.wetAsphalt};
    border-color: ${(props) => props.theme.colors.wetAsphalt};

    &:after {
      background: ${(props) => props.theme.colors.white};
    }
  }

  ${checkedDefaultCheckbox}

  ${Input}:disabled + & {
    pointer-events: none;
    background: ${(props) => props.theme.colors.grey};
    border: 4px solid ${(props) => props.theme.colors.grey};
  }

  ${disabledCheckedAfter}

  ${Input}:disabled + &::after {
    background: ${(props) => props.theme.colors.pencil};
    top: 3px;
    left: 0;
  }
`

export const BasicCheckbox = styled.span`
  width: ${CHECKBOX_SIZE}px;
  height: ${CHECKBOX_SIZE}px;
  position: relative;
  border: 2px solid ${(props) => props.theme.colors.asphaltLight};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.asphalt};
  }

  ${checkedDefaultCheckbox}

  ${Input}:disabled + & {
    border-color: ${(props) => props.theme.colors.grey};
    background: ${(props) => props.theme.colors.grey};
    pointer-events: none;
  }

  ${Input}:disabled:checked + & {
    border: 4px solid ${(props) => props.theme.colors.grey};
  }

  ${disabledCheckedAfter}

  &:active {
    border-color: ${(props) => props.theme.colors.wetAsphalt};
    background: ${(props) => props.theme.colors.wetAsphalt};
  }
`
