import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import { ERROR_NO_ACCESS_MESSAGE } from '@constants'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import { getServerErrorStatus } from '@utils'

import { useDeletePrepaymentContractorsByIdMutation } from '@rtkApi/modules/enhancements/prepayment'

import * as T from './ModalCounterparty.types'
import { AddNewCounterparty } from './components/AddNewCounterparty'
import { CounterpartyList } from './components/CounterpartyList'
import { defaultValues, schema } from './constants/form'
import {
  ERROR_DELETE_COUNTERPARTY,
  SUCCESS_DELETE_COUNTERPARTY,
} from './constants/messages'
import { EModalType } from './enums/modalType.enum'

export const ModalCounterparty: React.FC<T.Props> = ({
  onClose,
  open,
  onSelectContractor,
  refetchContractors,
  contractorsData,
}) => {
  const [prevDeleteModalType, setPrevDeleteModalType] =
    useState<EModalType | null>(null)
  const [modalType, setModalType] = useState<EModalType>(
    EModalType.Counterparty,
  )
  const [apiDeleteContractorById] = useDeletePrepaymentContractorsByIdMutation()

  const isEditContractorLegal = modalType === EModalType.EditContractorLegal
  const isAddCounterparty = modalType === EModalType.AddCounterparty
  const isEditContractorIndividual =
    modalType === EModalType.EditContractorIndividual
  const isDeleteContractor = modalType === EModalType.ConfirmDeleteCounterparty

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<T.CounterpartiesData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const handleConfirmDeleteContractor = useCallback(async () => {
    try {
      const id = watch('id')

      await apiDeleteContractorById({ id: Number(id) }).unwrap()
      toast.success(SUCCESS_DELETE_COUNTERPARTY)
      await refetchContractors()
      onSelectContractor({ alias: '' })
      setModalType(EModalType.Counterparty)
      reset()
    } catch (error) {
      setModalType(prevDeleteModalType || EModalType.Counterparty)
      setPrevDeleteModalType(null)
      const status = getServerErrorStatus(error as ServerError)
      if (status === 409) {
        return toast.error(ERROR_DELETE_COUNTERPARTY)
      }
      toast.error(ERROR_NO_ACCESS_MESSAGE)
    }
  }, [watch, apiDeleteContractorById, onSelectContractor, prevDeleteModalType])

  const handleCancelDeleteContractor = useCallback(() => {
    setModalType(prevDeleteModalType || EModalType.Counterparty)
  }, [prevDeleteModalType])

  const createNewCounterparty = useCallback(() => {
    setModalType(EModalType.AddCounterparty)
    reset()
  }, [])

  const handleClose = () => {
    setModalType(EModalType.Counterparty)
    onClose()
  }

  const addingNewCounterparty: ButtonProps = {
    onClick: createNewCounterparty,
    text: 'Добавить нового контрагента',
    disabled: false,
    isVisible: true,
    color: contractorsData?.length ? 'secondary' : 'primary',
  }

  const successDelete: ButtonProps = {
    onClick: handleConfirmDeleteContractor,
    text: 'Удалить',
    color: 'primary',
  }

  const cancelDelete: ButtonProps = {
    onClick: handleCancelDeleteContractor,
    text: 'Отменить',
    color: 'secondary',
    isVisible: true,
  }

  return (
    <>
      {modalType === EModalType.Counterparty && (
        <Dialog
          hasCloseIcon
          isOpen={open}
          successButton={addingNewCounterparty}
          title="Контрагент"
          onClose={handleClose}>
          <CounterpartyList
            contractorsData={contractorsData}
            isOpen={open}
            setModalType={setModalType}
            setValue={setValue}
            onClose={handleClose}
            onSelectContractor={onSelectContractor}
          />
        </Dialog>
      )}
      <AddNewCounterparty
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        isAddCounterparty={isAddCounterparty}
        isDirty={isDirty}
        isEditContractorIndividual={isEditContractorIndividual}
        isEditContractorLegal={isEditContractorLegal}
        isOpen={open}
        isValid={isValid}
        modalType={modalType}
        reset={reset}
        setModalType={setModalType}
        setPrevDeleteModalType={setPrevDeleteModalType}
        setValue={setValue}
        watch={watch}
        onClose={handleClose}
        onRefetch={refetchContractors}
        onSelectContractor={onSelectContractor}
      />
      {isDeleteContractor && (
        <Dialog
          cancelButton={cancelDelete}
          isOpen={open}
          successButton={successDelete}
          title="Вы уверены, что хотите удалить контрагента?"
          onClose={handleClose}
        />
      )}
    </>
  )
}
