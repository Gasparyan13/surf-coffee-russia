import { Grid, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import rfdc from 'rfdc'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { heightInheritCSS, mb, mt } from '@common/common.styled'
import { SwitchButton } from '@common/newUi/SwitchButton'

import { ToggleButtonGroup } from '@uiKit'

import { HeaderSpot } from '@pages/WelcomePage/components/HeaderSpot'

import { TitleStep } from '../../../components/TitleStep'
import { useSpotConfigurationCtx } from '../../../containers/SpotConfigurationCtx'
import { useWorkingDayPageCtx } from '../WorkingDayPageCtx'
import {
  backTextCSS,
  ShiftTitleCSS,
  stepShiftTextCSS,
  stepTitleCSS,
  Styled,
  switchButtonBoxCSS,
  switchButtonLongTextCSS,
  switchButtonTextCSS,
} from './WorkingDayHeader.styled'

const clone = rfdc()

const options = [
  {
    label: 'Будни',
    value: 'weekdays',
  },
  {
    label: 'Выходные',
    value: 'weekends',
  },
]

export const WorkingDayHeader: React.FC = () => {
  const { wizardContext, onGoNext } = useSpotConfigurationCtx()
  const { control, setShiftStepsValues, watch, shiftStepsValues } =
    useWorkingDayPageCtx()
  const shiftStandard = watch('shiftStandard')
  const switchActive = watch('shiftDayType')

  const handleGoBack = useCallback(() => {
    onGoNext({ ...wizardContext, stepName: 'WORKING_HOURS' })
  }, [onGoNext, wizardContext])

  const updateUsePreset = useCallback(
    (usePreset: boolean) => {
      setShiftStepsValues((prevValue) => ({ ...clone(prevValue), usePreset }))
    },
    [setShiftStepsValues],
  )

  const handleChangeShiftStandard = useCallback(
    (onChange: (...event: unknown[]) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked
        updateUsePreset(isChecked)
        if (
          (!isChecked && shiftStepsValues?.manual?.weekdays?.length) ||
          shiftStepsValues?.manual?.weekends?.length
        )
          toast.success('Смены успешно сохранены')

        return onChange(isChecked ? 'preset' : 'manual')
      },
    [
      shiftStepsValues?.manual?.weekdays?.length,
      shiftStepsValues?.manual?.weekends?.length,
      updateUsePreset,
    ],
  )

  const renderShiftStandard = useMemo(() => {
    const text = switchActive === 'weekends' ? 'выходные' : 'будни'

    if (shiftStandard === 'preset') {
      return (
        <Typography
          css={
            switchButtonTextCSS
          }>{`Стандартный набор смен включен. Текущие смены на ${text}`}</Typography>
      )
    }

    return (
      <Typography
        css={
          switchButtonLongTextCSS
        }>{`Стандартный набор смен выключен. Текущие смены на ${text}`}</Typography>
    )
  }, [switchActive, shiftStandard])

  return (
    <Styled.Root>
      <Grid container css={heightInheritCSS} justifyContent="space-between">
        <Grid item xs={12}>
          <HeaderSpot />
        </Grid>
        <Grid item css={[mb(40), mt(40)]} xs={12}>
          <Styled.Header>
            <TitleStep title="Смены">
              <Grid
                container
                alignItems="center"
                css={stepTitleCSS}
                onClick={handleGoBack}>
                <Grid item css={mt(4)} xs={3}>
                  <SvgArrowIcon direction="right" />
                </Grid>
                <Grid item xs={9}>
                  <Typography css={backTextCSS}> Назад</Typography>
                </Grid>
              </Grid>
            </TitleStep>
            <Typography css={stepShiftTextCSS}>
              Задай смены работы персонала
            </Typography>
            <Grid
              container
              css={ShiftTitleCSS}
              justifyContent="space-between"
              spacing={2}>
              <Grid item xs={5}>
                <Controller
                  control={control}
                  name="shiftStandard"
                  render={({ field: { value, onChange } }) => (
                    <Grid container css={switchButtonBoxCSS}>
                      <Grid item xs={1}>
                        <SwitchButton
                          checked={value === 'preset'}
                          onChange={handleChangeShiftStandard(onChange)}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        {renderShiftStandard}
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Styled.ButtonSwitch>
                      <Controller
                        control={control}
                        name="shiftDayType"
                        render={({ field: { value, onChange } }) => (
                          <ToggleButtonGroup
                            currentValue={value}
                            tabs={options}
                            onChange={(_, newValue) => {
                              onChange(newValue)
                            }}
                          />
                        )}
                      />
                    </Styled.ButtonSwitch>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Styled.Header>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
