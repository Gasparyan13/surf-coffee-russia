import { Grid, Popover } from '@mui/material'
import React, { MouseEvent, useState } from 'react'

import { SvgCreateIcon } from '@common/IconComponents/SvgCreateIcon'

import { Operations } from '@constants'

import { theme } from '@providers/ThemeProvider/theme'

import { ListRow, Typography } from '@uiKit'

import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import { useAppDispatch } from '@store/rootConfig'

import {
  gridActiveChildCSS,
  gridLayoutChildCSS,
  gridLayoutChildTextCSS,
  iconHeightCSS,
} from '../../Sidebar.styled'
import { getListRowOperations } from '../../utils/getters'
import * as Styled from './CreateButton.styled'

export const CreateButton: React.FC = () => {
  const [openListRow, setOpenListRow] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const ListRowOperations = getListRowOperations(Operations)

  const handleButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    setOpenListRow((prev) => !prev)
    setAnchorEl(event.currentTarget)
  }

  const handleListItemClick = (itemIndex: number) => () => {
    setOpenListRow(false)
    const operation = ListRowOperations[itemIndex]

    dispatch(
      setOperationDrawerState({
        type: operation.id,
        title: operation.titleForCreateOperation,
      }),
    )
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenListRow(false)
  }

  return (
    <Styled.Root>
      <Grid
        container
        alignItems="center"
        css={[
          openListRow ? gridActiveChildCSS : gridLayoutChildTextCSS,
          gridLayoutChildCSS,
        ]}
        direction="row"
        gap={1}
        justifyContent="center"
        onClick={(event) => handleButtonClick(event)}>
        <Grid item css={iconHeightCSS}>
          <SvgCreateIcon />
        </Grid>
        <Grid item xs={7.5}>
          <Typography
            color={openListRow ? theme.colors.black : theme.colors.wetAsphalt}
            variant={openListRow ? 'LabelBold' : 'PBody'}>
            Создать
          </Typography>
        </Grid>
      </Grid>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id="createOperationsPopover"
        open={openListRow}
        onClose={handleClose}>
        <Styled.ListRow>
          {ListRowOperations.map(({ id, title }, index) => (
            <ListRow
              key={id}
              text={title}
              onClick={handleListItemClick(index)}
            />
          ))}
        </Styled.ListRow>
      </Popover>
    </Styled.Root>
  )
}
