import React, { useCallback, useEffect, useState } from 'react'

import { PATHS } from '@constants'

import { useLocationQuery } from '@hooks'

import { SearchField } from '@uiKit'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import * as Styled from './SearchFilter.styled'

export const SearchFilter: React.FC = () => {
  const { get, set } = useLocationQuery({
    defaultParams: [
      {
        pathname: PATHS.operations,
        key: OperationsReportUrlSearchParams.search,
        value: '',
      },
    ],
  })

  const searchValue = get(OperationsReportUrlSearchParams.search)

  const [search, setSearch] = useState(searchValue ?? '')

  const handleChangeSearch = useCallback((newValue: string) => {
    const value = newValue.trim()

    setSearch(value)
  }, [])

  useEffect(() => {
    set({
      key: OperationsReportUrlSearchParams.search,
      value: search,
    })
  }, [search])

  return (
    <Styled.Search>
      <SearchField
        name="searchOperationsField"
        placeholder="Поиск по контрагенту, статье и наименованию"
        size="flex"
        value={search}
        onChange={handleChangeSearch}
      />
    </Styled.Search>
  )
}
