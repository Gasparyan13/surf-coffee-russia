import { CircularProgress, Grid } from '@mui/material'
import React, { useMemo } from 'react'

import { SpotWizardContextViewDto } from '@rtkApi/modules/__generated__/spot_config'

import { WorkingDay } from '../../WorkingDayPages/containers/WorkingDay'
import { useSpotConfigurationCtx } from '../../containers/SpotConfigurationCtx'
import { ScheduleStep } from '../ScheduleStep'
import { spotConfigLoaderGridCSS, Styled } from './SpotConfiguration.styled'

const ComponentSet = new Map<
  SpotWizardContextViewDto['stepName'],
  JSX.Element
>()
ComponentSet.set('WORKING_HOURS', <ScheduleStep />)
ComponentSet.set('SHIFTS', <WorkingDay />)

export const SpotConfiguration: React.FC = () => {
  const { wizardContext } = useSpotConfigurationCtx()

  const renderCurrentStep = useMemo(() => {
    const stepName = wizardContext?.stepName
    if (stepName) return ComponentSet.get(stepName)
    return (
      <Grid
        container
        alignItems="center"
        css={spotConfigLoaderGridCSS}
        justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }, [wizardContext])

  return <Styled.Root>{renderCurrentStep}</Styled.Root>
}
