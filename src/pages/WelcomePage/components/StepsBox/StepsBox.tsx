import { Grid, Typography } from '@mui/material'
import React from 'react'

import { Styled, textBoxCSS } from './StepsBox.styled'

export type StepBoxItem = {
  id: string
  text: string
  imgUrl: JSX.Element
  blurred: boolean
  path: string
}

type Props = {
  steps: StepBoxItem[]
  onBoxClick: (id: string) => () => void
}

export const StepsBox: React.FC<Props> = ({ steps, onBoxClick }) => {
  return (
    <Styled.Root>
      <Grid alignItems="center" display="flex" justifyContent="space-between">
        {steps.map(({ blurred, text, imgUrl, id }) => {
          return (
            <Styled.StepBox key={id} blurred={blurred} onClick={onBoxClick(id)}>
              <Styled.TitleBox blurred={blurred}>
                <Typography css={textBoxCSS}>{text}</Typography>
              </Styled.TitleBox>
              <Styled.SvgCard>{imgUrl}</Styled.SvgCard>
            </Styled.StepBox>
          )
        })}
      </Grid>
    </Styled.Root>
  )
}
