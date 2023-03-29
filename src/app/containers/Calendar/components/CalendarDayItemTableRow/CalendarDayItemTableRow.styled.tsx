import { css } from '@emotion/react'

import styled from '@common/styled'

const commonTableCellSizes = css`
  height: 60px;
  width: inherit;
`

const Root = styled.div``

const OpenShiftBox = styled.div`
  width: 249px;
  height: 53px;
  background: ${(props) => props.theme.colors.grey};
  border-radius: 16px;
  margin-left: 5px;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
`

const TableRow = styled.tr<{ $isFirstCell?: boolean }>`
  ${commonTableCellSizes};
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-bottom: none;
  border-right: none;
  ${(props) => (props.$isFirstCell ? `height: 65px` : '')};
  /* &:nth-of-type(1) {
    height: 66px;
  } */
  /* &:nth-of-type(7) {
    height: 66px;
  } */
`

const TableData = styled.td<{ $isFirstCell?: boolean }>`
  ${commonTableCellSizes}
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-bottom: none;
  border-right: none;
  ${(props) => (props.$isFirstCell ? `height: 65px` : '')};
`

export const Styled = { Root, TableRow, TableData, OpenShiftBox }
