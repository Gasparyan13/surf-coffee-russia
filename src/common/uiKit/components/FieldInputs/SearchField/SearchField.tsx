import { IconButton, InputAdornment } from '@mui/material'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useState } from 'react'

import { SvgCloseIcon } from '@common/IconComponents/SvgCloseIcon'
import { SvgSearchIcon } from '@common/IconComponents/SvgSearchIcon'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { TextField } from '../TextField'
import * as Styled from './SearchField.styled'
import * as T from './SearchField.types'
import { TEST_ID_ICON_SEARCH } from './constants/testIds'
import { defaultSearchDelayTime } from './constants/timers'

export const SearchField: React.FC<T.Props> = ({
  value,
  onChange,
  delayTime = defaultSearchDelayTime,
  placeholder = 'Поиск',
  disabled,
  ...rest
}) => {
  const [query, setQuery] = useState(value ?? '')

  const handleResetValue = useCallback(() => {
    onChange?.('')
    setQuery('')
  }, [onChange])

  const handleChangeValue = useCallback(
    (searchValue: string) => onChange?.(searchValue),
    [onChange],
  )

  const delayedQuery = useCallback(debounce(handleChangeValue, delayTime), [])

  const handleChangeQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    },
    [],
  )

  useEffect(() => {
    delayedQuery(query)

    return delayedQuery.cancel
  }, [query, delayedQuery])

  useEffect(() => {
    if (value === '') setQuery('')
  }, [value])

  return (
    <TextField
      {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgSearchIcon {...createTestId(TEST_ID_ICON_SEARCH)} />
          </InputAdornment>
        ),
        endAdornment: query ? (
          <InputAdornment position="end">
            <IconButton
              css={Styled.iconButtonCSS}
              disabled={disabled}
              onClick={handleResetValue}>
              <SvgCloseIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
        inputComponent: Styled.Input,
      }}
      disabled={disabled}
      placeholder={placeholder}
      value={query}
      onChange={handleChangeQuery}
    />
  )
}
