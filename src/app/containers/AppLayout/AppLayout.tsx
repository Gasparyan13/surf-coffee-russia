import { Grid } from '@mui/material'
import React from 'react'

import { height100CSS } from '../../../common/common.styled'
import { Main as CreateOperations } from '../../../pages/CreateOperations/containers/Main'
import { getManagerCurrentProjectId } from '../../../store/deprecated/modules/app/selectors'
import { useAppSelector } from '../../../store/rootConfig'
import { Sidebar } from '../Sidebar'
import { Styled } from './AppLayout.styled'
import * as T from './AppLayout.types'

export const AppLayout: React.FC<T.Props> = ({ children }) => {
  const enterpriseId = useAppSelector(getManagerCurrentProjectId)

  return (
    <Styled.Root>
      <Grid container css={height100CSS}>
        <Grid item xs={1.833}>
          {enterpriseId && <CreateOperations />}
          <Sidebar />
        </Grid>
        <Grid item xs={10.167}>
          <Styled.Content>{children}</Styled.Content>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
