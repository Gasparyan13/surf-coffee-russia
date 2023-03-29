/* eslint-disable */
//@ts-nocheck
import { Grid } from '@mui/material'
import { parse } from 'query-string'
import React from 'react'
import { useLocation } from 'react-router'

import { height100CSS, mt } from '../../common.styled'
import { GoBack } from '../../ui'
import { Styled } from './GoBackContainer.styled'

type Props = React.PropsWithChildren & {
  rightSidebar?: () => React.ReactNode
  leftSidebar?: () => React.ReactNode
}

export const GoBackContainer: React.FC<Props> = ({
  children,
  rightSidebar,
  leftSidebar,
}) => {
  const location = useLocation()

  const goBackLink = parse(location.search)?.back

  const backLinks =
    parse(goBackLink) && Object.keys(parse(goBackLink))[0]?.split(',')

  return (
    <Styled.Root>
      <Grid container css={height100CSS}>
        <Grid item xs={3}>
          <Styled.LeftSidebar>
            <Grid container spacing={10}>
              {Array.isArray(backLinks) && (
                <Grid item xs={12}>
                  <GoBack
                    backLink={`${backLinks[backLinks.length - 1]}${
                      backLinks?.length > 1
                        ? `?back=${backLinks.slice(0, -1)}`
                        : ''
                    }`}
                  />
                </Grid>
              )}
              {leftSidebar && (
                <Grid item xs={12}>
                  {leftSidebar()}
                </Grid>
              )}
            </Grid>
          </Styled.LeftSidebar>
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={3} css={mt(100)}>
          {rightSidebar && rightSidebar()}
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
