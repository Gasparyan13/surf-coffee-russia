import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import MuiTableRow from '@mui/material/TableRow'
import React from 'react'

import { TableCell, Typography } from '@common/uiKit'

import { theme } from '@providers/ThemeProvider/theme'

import * as Styled from './Table.styled'
import * as T from './Table.types'

export const Table: <P>(p: T.Props<P>) => React.ReactElement<T.Props<P>> = ({
  maxHeight,
  minWidth = 650,
  header,
  rows,
  rowRenderer,
  sx,
  tableCSS,
  headerCSS,
  bodyCSS,
  contentEmptyRowRenderer,
}) => {
  const getHeightTable = () => ({
    height: rows.length === 0 ? '100%' : 'auto',
  })

  return (
    <TableContainer sx={{ maxHeight, minWidth, height: 'inherit', ...sx }}>
      <MuiTable stickyHeader css={tableCSS} style={getHeightTable()}>
        <TableHead css={headerCSS}>
          <MuiTableRow component="tr" css={Styled.baseTableRowCSS}>
            {header.map(({ title, key, ...rest }) => (
              <TableCell {...rest} key={key} variant="head">
                {title}
              </TableCell>
            ))}
          </MuiTableRow>
        </TableHead>
        <TableBody css={bodyCSS}>
          {rows.length > 0 ? (
            rows.map((row, index) => rowRenderer(row, index, `row-${index}`))
          ) : (
            <MuiTableRow component="tr">
              <TableCell align="center" colSpan={header.length}>
                <Typography color={theme.colors.pencil} variant="PBody">
                  {contentEmptyRowRenderer ? (
                    contentEmptyRowRenderer()
                  ) : (
                    <>
                      Ничего не найдено <br />
                      Измените параметры поиска
                    </>
                  )}
                </Typography>
              </TableCell>
            </MuiTableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
