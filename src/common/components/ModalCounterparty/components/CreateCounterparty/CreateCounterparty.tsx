import { Grid, InputBaseProps, TextField } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'

import { FormLabel, ToggleButtonGroup } from '@uiKit'

import { PATHS } from '../../../../constants'
import { modalSwitchSelectorCSS } from '../../ModalCounterparty.styled'
import { options } from '../../constants/form'
import { LegalCounterparty } from '../LegalCounterparty'
import * as T from './CreateCounterparty.types'

export const CreateCounterparty: React.FC<T.Props> = ({
  handleCreateIndividual,
  setHasChangedInEditMode,
  handleCreateLegal,
  setActiveBtt,
  control,
  isEditContractorIndividual,
  isAddCounterparty,
  isEditContractorLegal,
  watch,
  setValue,
  errors,
  isValid,
}) => {
  const typeSwitch = watch('typeSwitch')
  const alias = watch('alias')
  const aliasEntity = watch('aliasEntity')

  const handleChangeSwitchValue = useCallback(() => {
    return setValue('typeSwitch', !typeSwitch)
  }, [typeSwitch])

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    onChange: InputBaseProps['onChange'],
  ) => {
    if (isEditContractorLegal) {
      setHasChangedInEditMode(event.currentTarget.value !== alias)
    }
    if (isEditContractorIndividual) {
      setHasChangedInEditMode(event.currentTarget.value !== aliasEntity)
    }
    if (typeof onChange === 'function') onChange(event)
  }

  const modalSwitchIndex = useMemo(() => (typeSwitch ? 0 : 1), [typeSwitch])

  const renderCounterpartyForm = useMemo(() => {
    if (typeSwitch) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleCreateIndividual}>
              <FormLabel text="Название">
                <Controller
                  control={control}
                  name="alias"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      fullWidth
                      error={!!error}
                      helperText={error && error.message}
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      name={`${PATHS.financialReports.main}.alias.counterparty`}
                      placeholder="Например, Васильев"
                      size="small"
                      value={value}
                      onChange={(event) => handleNameChange(event, onChange)}
                    />
                  )}
                />
              </FormLabel>
            </form>
          </Grid>
        </Grid>
      )
    }
    return (
      <LegalCounterparty
        control={control}
        errors={errors}
        handleCreateLegal={handleCreateLegal}
        isAddCounterparty={isAddCounterparty}
        isValid={isValid}
        setActiveBtt={setActiveBtt}
        setValue={setValue}
        watch={watch}
        onNameChange={handleNameChange}
      />
    )
  }, [
    typeSwitch,
    errors,
    handleCreateLegal,
    isAddCounterparty,
    setValue,
    isValid,
    watch,
    control,
    handleCreateIndividual,
  ])

  return (
    <Grid container>
      {!isEditContractorIndividual && !isEditContractorLegal && (
        <Grid item css={modalSwitchSelectorCSS} xs={12}>
          <ToggleButtonGroup
            fullWidth
            color="secondary"
            currentValue={modalSwitchIndex}
            tabs={options}
            onChange={handleChangeSwitchValue}
          />
        </Grid>
      )}
      {renderCounterpartyForm}
    </Grid>
  )
}
