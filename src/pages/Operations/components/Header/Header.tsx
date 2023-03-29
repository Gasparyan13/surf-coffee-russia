import { Grid } from '@mui/material'
import React from 'react'

import { heightInheritCSS } from '@common/common.styled'

import { Typography } from '@uiKit'

import * as Styled from './Header.styled'
import { DateRangeFilter } from './components/DateRangeFilter'
import { FilterButton } from './components/FilterButton'
import { SearchFilter } from './components/SearchFilter'

export const Header: React.FC = () => {
  return (
    <Styled.Root>
      <Grid
        container
        alignItems="center"
        css={heightInheritCSS}
        gap={2}
        justifyContent="space-between">
        <Grid item alignItems="center" display="flex" flexGrow={1} gap={3}>
          <Typography variant="H2">Операции</Typography>
          <SearchFilter />
        </Grid>
        <Grid item display="flex" gap={2}>
          <FilterButton />
          <DateRangeFilter />
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
