import { Grid, TextField } from '@mui/material'
import debounce from 'lodash/debounce'
import React, { ChangeEvent, memo, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import { ERROR_MESSAGE_500, PATHS } from '@constants'

import { FormLabel } from '@uiKit'

import { getServerErrorStatus } from '@utils'

import { useLazyGetPrepaymentSuggestOrgByInnQuery } from '@rtkApi/modules/__generated__/prepayment'

import {
  ERROR_ACCESS_ORGANIZATION,
  ERROR_VALIDATION_INN_LENGTH,
  SUCCESS_ORGANIZATION_BY_INN,
} from '../../constants/messages'
import { EINNLengths } from '../../enums/modalType.enum'
import * as T from './LegalCounerparty.types'

export const LegalCounterparty: React.FC<T.Props> = memo(
  ({
    setValue,
    errors,
    isAddCounterparty,
    handleCreateLegal,
    setActiveBtt,
    isValid,
    control,
    watch,
    onNameChange,
  }) => {
    const inn = watch('inn')

    const [searchContractorsById] = useLazyGetPrepaymentSuggestOrgByInnQuery()

    const renderErrorText = (error: ServerError) => {
      const status = getServerErrorStatus(error)
      if (status === 404) {
        toast.error(ERROR_ACCESS_ORGANIZATION)
      }
      if (status === 409) {
        toast.error(ERROR_VALIDATION_INN_LENGTH)
      }
      if (status === 500) {
        toast.error(ERROR_MESSAGE_500)
      }
    }

    const fetchSearch = useCallback(
      async (innValue: string) => {
        if (
          (!errors?.inn && innValue?.length === EINNLengths.Legal) ||
          innValue?.length === EINNLengths.Individual
        ) {
          try {
            const result = await searchContractorsById({
              inn: innValue,
            }).unwrap()
            const { orgName, ogrn, kpp } = result
            setValue('orgName', orgName!)
            setValue('ogrn', ogrn!)
            setValue('kpp', kpp!)
            toast.success(SUCCESS_ORGANIZATION_BY_INN)
            setValue('typeSwitch', false)
            setActiveBtt(true)
          } catch (e) {
            setActiveBtt(false)
            renderErrorText(e as ServerError)
          }
        }
      },
      [errors, isValid],
    )

    const debouncedFetch = debounce(fetchSearch, 300)

    const handleChange = useCallback(
      (onChange: (e: string) => void) =>
        async (event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.currentTarget
          setValue('typeSwitch', false)
          setValue('orgName', '')
          setValue('kpp', '')
          setValue('ogrn', '')
          onChange(value)
          debouncedFetch(value)
          setActiveBtt(false)
        },
      [debouncedFetch, inn, errors],
    )

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) =>
        !/[0-9]/.test(e.key) && e.preventDefault(),
      [],
    )

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleCreateLegal}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel text="Название компании">
                  <Controller
                    control={control}
                    name="aliasEntity"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        error={!!errors?.aliasEntity}
                        helperText={
                          errors?.aliasEntity && errors.aliasEntity?.message
                        }
                        inputProps={{
                          autoComplete: 'off',
                        }}
                        name={`${PATHS.financialReports.main}.aliasEntity.company`}
                        placeholder="Например, Васильев"
                        size="small"
                        value={value}
                        onChange={(event) => onNameChange(event, onChange)}
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormLabel disabled={!isAddCounterparty} text="ИНН">
                  <Controller
                    control={control}
                    name="inn"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        disabled={!isAddCounterparty}
                        error={!!errors?.inn}
                        helperText={errors?.inn && errors.inn?.message}
                        inputProps={{ maxLength: 12, autoComplete: 'off' }}
                        name={`${PATHS.financialReports.main}.createCounterparty.inn`}
                        placeholder="Например, 6163152794"
                        value={value}
                        onChange={handleChange(onChange)}
                        onKeyPress={handleKeyPress}
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormLabel disabled text="Полное название компании">
                  <Controller
                    control={control}
                    name="orgName"
                    render={({ field: { value } }) => (
                      <TextField
                        disabled
                        fullWidth
                        placeholder=""
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormLabel disabled text="КПП">
                  <Controller
                    control={control}
                    name="kpp"
                    render={({ field: { value } }) => (
                      <TextField
                        disabled
                        fullWidth
                        placeholder=""
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormLabel disabled text="ОГРН">
                  <Controller
                    control={control}
                    name="ogrn"
                    render={({ field: { value } }) => (
                      <TextField
                        disabled
                        fullWidth
                        color="primary"
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    )
  },
)
