import MuiAutocomplete from '@mui/material/Autocomplete'
import React from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { SvgCrossIcon } from '@common/IconComponents/SvgCrossIcon'
import { mt } from '@common/common.styled'

import { theme } from '@providers/ThemeProvider/theme'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { SearchTextHighlighter } from '../../../components/SearchTextHighlighter'
import { TextField } from '../FieldInputs/TextField'
import { ListRow } from '../ListRow/ListRow'
import { Typography } from '../Typography'
import { autocompleteBaseCSS } from './Autocomplete.styled'
import * as T from './Autocomplete.types'
import { EMPTY_RESULTS_PLACEHOLDER } from './constants/placeholder'
import { TEST_ID_CLEAR, TEST_ID_EXPAND } from './constants/testIds'

export const Autocomplete: <C extends T.AutocompleteItem>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  labelText,
  helperText,
  error,
  placeholder,
  noOptionsText = EMPTY_RESULTS_PLACEHOLDER,
  size = 'flex',
  disabled,
  ...autocompleteProps
}) => {
  return (
    <MuiAutocomplete
      disabled={disabled}
      {...autocompleteProps}
      clearIcon={<SvgCrossIcon {...createTestId(TEST_ID_CLEAR)} />}
      css={autocompleteBaseCSS}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      noOptionsText={
        <Typography color={theme.colors.pencil} css={mt(1)} variant="PBody">
          {noOptionsText}
        </Typography>
      }
      popupIcon={<SvgArrowIcon {...createTestId(TEST_ID_EXPAND)} />}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          labelText={labelText}
          placeholder={placeholder}
          size={size}
        />
      )}
      renderOption={(props, { value, label, key }, state) => (
        <ListRow
          {...props}
          key={key}
          isSelected={state.selected}
          text={
            <SearchTextHighlighter
              searchWords={state.inputValue}
              value={label}
            />
          }
          value={value}
        />
      )}
    />
  )
}
