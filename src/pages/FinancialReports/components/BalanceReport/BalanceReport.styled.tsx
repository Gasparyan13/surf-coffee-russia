import { css } from '@emotion/react'

import styled from '@common/styled'

export const Root = styled.div`
  position: relative;
`

export const tableFirstColumnCSS = css`
  .fixedDataTableCellLayout_main.public_fixedDataTableCell_main:first-of-type {
    box-shadow: -14px 0px 19px 14px rgb(44 44 44 / 10%);
    position: relative;
    z-index: 1;

    > div {
      border-right: none;
    }
  }

  .public_fixedDataTable_bodyRow.fixedDataTableLayout_hasBottomBorder.public_fixedDataTable_hasBottomBorder,
  .fixedDataTableRowLayout_main.public_fixedDataTableRow_main.public_fixedDataTableRow_even.public_fixedDataTable_bodyRow.fixedDataTableLayout_hasBottomBorder.public_fixedDataTable_hasBottomBorder {
    border-bottom: none;
  }

  .public_fixedDataTableRow_fixedColumnsDivider {
    border-color: transparent;
  }
`
