import { Grid } from '@mui/material'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { ERROR_MESSAGE_500, ERROR_VALIDATION_MESSAGE } from '@constants'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import { getServerErrorStatus } from '@utils'

import {
  ContractorCreateDto,
  ContractorUpdateDto,
  usePostPrepaymentContractorsMutation,
} from '@rtkApi/modules/__generated__/prepayment'
import { usePatchPrepaymentContractorsMutation } from '@rtkApi/modules/enhancements/prepayment'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { CounterpartiesData } from '../../ModalCounterparty.types'
import {
  ERROR_COUNTERPARTY_EXISTS,
  ERROR_INN_EXISTS,
  SUCCESS_ADDED_COUNTERPARTY,
  SUCCESS_UPDATE_COUNTERPARTY,
} from '../../constants/messages'
import { EModalType } from '../../enums/modalType.enum'
import { CreateCounterparty } from '../CreateCounterparty'
import * as T from './AddNewCounterparty.types'

export const AddNewCounterparty: React.FC<T.Props> = ({
  isOpen,
  onClose,
  onRefetch,
  onSelectContractor,
  setPrevDeleteModalType,
  modalType,
  control,
  watch,
  setValue,
  handleSubmit,
  errors,
  reset,
  isValid,
  isDirty,
  isEditContractorLegal,
  isAddCounterparty,
  isEditContractorIndividual,
  setModalType,
}) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)
  const [activeBtt, setActiveBtt] = useState(false)
  const [hasChangedInEditMode, setHasChangedInEditMode] = useState(false)
  const [updateContractor] = usePatchPrepaymentContractorsMutation()
  const [createContractor] = usePostPrepaymentContractorsMutation()

  const id = watch('id')
  const alias = watch('alias')
  const typeSwitch = watch('typeSwitch')

  const handleDeleteContractor = useCallback(() => {
    setPrevDeleteModalType(modalType)
    setModalType(EModalType.ConfirmDeleteCounterparty)
  }, [modalType])

  const renderErrorText = (error: FetchBaseQueryError | SerializedError) => {
    const status = getServerErrorStatus(error)

    if (!status) return

    if (status === 400) {
      toast.error(ERROR_VALIDATION_MESSAGE)
    }

    if (status === 500) {
      toast.error(ERROR_MESSAGE_500)
    }

    if (status === 409) {
      toast.error(typeSwitch ? ERROR_COUNTERPARTY_EXISTS : ERROR_INN_EXISTS)
    }
  }

  const addContractor = async (contractor: ContractorCreateDto) => {
    await createContractor({
      contractorCreateDto: contractor,
    }).unwrap()

    const data = await onRefetch()
    const newContractor = data?.find((el) => el.alias === contractor.alias)

    if (newContractor) {
      onSelectContractor(newContractor)
      toast.success(SUCCESS_ADDED_COUNTERPARTY)
    }
  }

  const editContractor = async (contractor: ContractorUpdateDto) => {
    await updateContractor({
      contractorUpdateDto: contractor,
    }).unwrap()
    onSelectContractor(contractor)
    onRefetch()
    toast.success(SUCCESS_UPDATE_COUNTERPARTY)
  }

  const handleBackModal = useCallback(() => {
    setModalType(EModalType.Counterparty)
    setHasChangedInEditMode(false)
    reset()
  }, [])

  const handleCreateIndividual = handleSubmit(
    async (data: CounterpartiesData) => {
      try {
        const { alias } = data

        if (isEditContractorIndividual) {
          const individualEdit: ContractorUpdateDto = {
            id: id as number,
            alias,
            type: 'individual',
            enterpriseId,
          }

          await editContractor(individualEdit)
        }

        if (isAddCounterparty) {
          const individual: ContractorCreateDto = {
            alias,
            type: 'individual',
            enterpriseId,
          }

          await addContractor(individual)
        }

        onClose()
      } catch (e) {
        renderErrorText(e as FetchBaseQueryError)
      }
    },
  )

  const handleCreateLegal = handleSubmit(async (data: CounterpartiesData) => {
    try {
      const { aliasEntity, inn, ogrn, orgName, kpp } = data

      if (isEditContractorLegal) {
        const entityEdit: ContractorUpdateDto = {
          id: id as number,
          alias: aliasEntity,
          inn,
          orgName,
          kpp,
          ogrn,
          type: 'legal',
          enterpriseId,
        }

        await editContractor(entityEdit)
      }

      if (isAddCounterparty) {
        const entity: ContractorCreateDto = {
          alias: aliasEntity,
          inn,
          orgName,
          kpp,
          ogrn,
          type: 'legal',
          enterpriseId,
        }

        await addContractor(entity)
      }

      onClose()
    } catch (e) {
      renderErrorText(e as FetchBaseQueryError)
    }
  })

  const renderTitleDialog = useMemo(() => {
    if (isEditContractorLegal || isEditContractorIndividual) {
      return 'Редактировать'
    }
    return 'Добавить контрагента'
  }, [isEditContractorLegal, isEditContractorIndividual])

  const renderTitleButton = useMemo(() => {
    if (isEditContractorLegal || isEditContractorIndividual) {
      return 'Сохранить'
    }
    return 'Добавить'
  }, [isEditContractorLegal, isEditContractorIndividual])

  const hasDisabledIndividualButton = useMemo(() => {
    if (isAddCounterparty) {
      return !(Boolean(alias) && isDirty)
    }
    if (isEditContractorIndividual) {
      return !hasChangedInEditMode
    }
  }, [
    alias,
    isDirty,
    isEditContractorIndividual,
    isAddCounterparty,
    hasChangedInEditMode,
  ])

  const hasDisabledLegalButton = useMemo(() => {
    if (isAddCounterparty) {
      return !(activeBtt && isDirty && isValid)
    }
    if (isEditContractorLegal) {
      return !hasChangedInEditMode
    }
  }, [
    isValid,
    isDirty,
    activeBtt,
    isAddCounterparty,
    isEditContractorLegal,
    hasChangedInEditMode,
  ])

  const successButton: ButtonProps = {
    onClick: typeSwitch ? handleCreateIndividual : handleCreateLegal,
    text: renderTitleButton,
    disabled: typeSwitch ? hasDisabledIndividualButton : hasDisabledLegalButton,
    isVisible: true,
    color: 'primary',
  }

  const deleteButton: ButtonProps = {
    onClick: handleDeleteContractor,
    text: 'Удалить',
    disabled: false,
    isVisible: isEditContractorLegal || isEditContractorIndividual,
    color: 'critical',
  }

  if (
    !(isEditContractorLegal || isAddCounterparty || isEditContractorIndividual)
  )
    return null

  return (
    <Dialog
      hasCloseIcon
      hasIconBack
      cancelButton={deleteButton}
      isOpen={isOpen}
      successButton={successButton}
      title={renderTitleDialog}
      onBack={handleBackModal}
      onClose={onClose}>
      <Grid container>
        <CreateCounterparty
          control={control}
          errors={errors}
          handleCreateIndividual={handleCreateIndividual}
          handleCreateLegal={handleCreateLegal}
          isAddCounterparty={isAddCounterparty}
          isEditContractorIndividual={isEditContractorIndividual}
          isEditContractorLegal={isEditContractorLegal}
          isValid={isValid}
          setActiveBtt={setActiveBtt}
          setHasChangedInEditMode={setHasChangedInEditMode}
          setValue={setValue}
          watch={watch}
        />
      </Grid>
    </Dialog>
  )
}
