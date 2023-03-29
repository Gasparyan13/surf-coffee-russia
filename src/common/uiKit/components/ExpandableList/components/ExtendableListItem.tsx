import { Grid, GridSize } from '@mui/material'
import React from 'react'

import { SvgDeleteIcon } from '@common/IconComponents/SvgDeleteIcon'
import { SvgPlusIcon } from '@common/IconComponents/SvgPlusIcon'
import { cursorPointerCSS } from '@common/common.styled'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import {
  contentContainerCSS,
  itemContentCSS,
} from './ExtendableListItem.styled'
import * as T from './ExtendableListItem.types'
import { TEST_ID_ADD, TEST_ID_REMOVE } from './constants/testIds'

export const ExtendableListItem: React.FC<T.Props> = ({
  children,
  onAdd,
  onRemove,
  canAdd,
  canRemove,
}) => {
  const allActionsAvailable = canAdd && canRemove
  const oneActionAvailable = canAdd || canRemove

  return (
    <Grid
      container
      alignItems="center"
      css={contentContainerCSS}
      flexWrap="nowrap"
      gap={2}>
      <Grid item css={itemContentCSS} maxWidth="100%" xs={11.3 as GridSize}>
        {children}
      </Grid>
      {oneActionAvailable && (
        <Grid item xs={0.4 as GridSize}>
          <Grid
            container
            direction="column"
            gap={allActionsAvailable ? 3 : 1}
            justifyContent="space-between">
            {canRemove && (
              <Grid
                item
                css={cursorPointerCSS}
                onClick={onRemove}
                {...createTestId(TEST_ID_REMOVE)}>
                <SvgDeleteIcon />
              </Grid>
            )}
            {canAdd && (
              <Grid
                item
                css={cursorPointerCSS}
                onClick={onAdd}
                {...createTestId(TEST_ID_ADD)}>
                <SvgPlusIcon />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
