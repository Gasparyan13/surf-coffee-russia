import { InputAdornment } from '@mui/material'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { SvgDocumentsIcon } from '@common/IconComponents/SvgDocumentsIcon'
import { ModalCounterparty } from '@common/components/ModalCounterparty'

import { makeInputError } from '@helpers'

import { TextField } from '@uiKit/components/FieldInputs/TextField'

import {
  ContractorDto,
  useLazyGetPrepaymentContractorsQuery,
} from '@rtkApi/modules/__generated__/prepayment'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import * as T from './FormContractorInput.types'

export const FormContractorInput: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({ name, control, errors }) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const [openModal, setOpenModal] = useState(false)

  const [apiReqGetContractorsByProjectId, { data: contractorsData }] =
    useLazyGetPrepaymentContractorsQuery()

  const handleSelectContractor = useCallback(
    (onChange: (arg: ContractorDto) => void) => (contractor: ContractorDto) => {
      onChange(contractor)
    },
    [],
  )

  const fetchContractors = useCallback(async () => {
    const { data } = await apiReqGetContractorsByProjectId({
      enterpriseId,
      isWorker: false,
    })
    return data
  }, [apiReqGetContractorsByProjectId, enterpriseId])

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpenModal(false)
  }, [])

  useLayoutEffect(() => {
    fetchContractors()
  }, [])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <TextField
            {...makeInputError(name, errors)}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <SvgDocumentsIcon />
                </InputAdornment>
              ),
              onClick: handleOpenModal,
            }}
            labelText="Контрагент"
            placeholder="Например, Васильев"
            value={value?.alias || ''}
          />
          <ModalCounterparty
            contractorsData={contractorsData}
            open={openModal}
            refetchContractors={fetchContractors}
            onClose={handleClose}
            onSelectContractor={handleSelectContractor(onChange)}
          />
        </>
      )}
    />
  )
}
