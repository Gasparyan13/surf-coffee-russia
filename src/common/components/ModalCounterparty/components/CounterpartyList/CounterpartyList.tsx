import { Grid, InputAdornment, TextField } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'

import { SvgEditIcon } from '@common/IconComponents/SvgEditIcon'
import { SvgSearchIcon } from '@common/IconComponents/SvgSearchIcon'
import { mb } from '@common/common.styled'

import { PATHS } from '@constants'

import { Typography } from '@uiKit'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { EModalType } from '../../enums/modalType.enum'
import { EmptyContractors } from '../EmptyContractors'
import {
  contractorAliasCSS,
  counterpartiesChildCSS,
  counterpartiesCSS,
  searchCounterpartiesCSS,
} from './CounterpartyList.styled'
import * as T from './CounterpartyList.types'

export const CounterpartyList: React.FC<T.Props> = ({
  contractorsData,
  onSelectContractor,
  setValue,
  onClose,
  isOpen,
  setModalType,
}) => {
  const [searchAlias, setSearchAlias] = useState('')

  const handleSelectContractor = (id: number | undefined) => () => {
    const selectedContractor = contractorsData?.find((el) => el.id === id)

    if (selectedContractor) {
      onSelectContractor(selectedContractor)
      onClose()
    }
  }

  const handleEditContractor = (id: number) => () => {
    const editContractor = contractorsData!.find((el) => el.id === id)
    const { alias, inn, orgName, kpp, ogrn } = editContractor!

    setValue('alias', alias || '')
    setValue('aliasEntity', alias || '')
    setValue('inn', inn || '')
    setValue('orgName', orgName || '')
    setValue('kpp', kpp || '')
    setValue('ogrn', ogrn || '')
    setValue('id', id)

    if (inn) {
      setModalType(EModalType.EditContractorLegal)
      setValue('typeSwitch', false)
    } else {
      setModalType(EModalType.EditContractorIndividual)
      setValue('typeSwitch', true)
    }
  }

  const handleSearchContractor = useCallback(
    (val: ContractorDto) => {
      if (!isOpen) {
        setSearchAlias('')
      }

      const isEmptySearchAlias = searchAlias.trim() === ''
      const isMatchesSearchAlias = val.alias
        ?.toLowerCase()
        .includes(searchAlias.toLowerCase())

      if (isEmptySearchAlias || isMatchesSearchAlias) {
        return val
      }
    },
    [isOpen, searchAlias],
  )

  const contractors = useMemo(
    () => contractorsData?.filter((val) => handleSearchContractor(val)),
    [contractorsData, handleSearchContractor],
  )

  return !contractorsData?.length ? (
    <EmptyContractors />
  ) : (
    <Grid
      container
      alignItems="center"
      css={mb(8)}
      direction="column"
      flexWrap="nowrap"
      justifyContent="flex-start">
      <Grid>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SvgSearchIcon />
              </InputAdornment>
            ),
            inputProps: {
              autoComplete: 'off',
            },
          }}
          color="primary"
          css={searchCounterpartiesCSS}
          name={`${PATHS.financialReports.main}.search.counterparty`}
          placeholder="Найти контрагента"
          variant="outlined"
          onChange={(event) => setSearchAlias(event.target.value)}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        css={counterpartiesCSS}
        direction="column"
        flexWrap="nowrap"
        gap={1}
        justifyContent="flex-start"
        textAlign="left">
        {contractors && contractors.length > 0 ? (
          contractors.map((contractor) => (
            <Grid
              key={contractor.id}
              container
              alignItems="center"
              css={counterpartiesChildCSS}
              justifyContent="space-between">
              <Grid
                item
                css={contractorAliasCSS}
                xs={10}
                onClick={handleSelectContractor(contractor.id)}>
                <Typography variant="PBody">{contractor.alias}</Typography>
              </Grid>
              <Grid item xs={1} onClick={handleEditContractor(contractor.id!)}>
                <SvgEditIcon />
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography css={contractorAliasCSS} variant="PBody">
            Ничего не найдено
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
