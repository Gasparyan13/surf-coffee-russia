/* eslint-disable */
//@ts-nocheck
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'

import { redTextCSS } from '../common/common.styled'

type ElType = {
  id?: number
  name?: string
}

type Props = {
  label: string
  value: number
  change: () => void
  menuItem: ElType
  id?: number
  error: boolean
  helperText: string
}

const SelectForm = ({
  label,
  value,
  change,
  menuItem,
  error,
  helperText,
}: Props): JSX.Element => (
  <FormControl fullWidth>
    <InputLabel id="select-label">{label}</InputLabel>
    <Select
      labelId="select-label"
      id="select"
      value={value}
      label={label}
      onChange={change}
      error={error}>
      {menuItem?.map((el: ElType, key: number) => (
        <MenuItem value={el.id} key={`${el.id}${key}`}>
          {el.name}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText css={redTextCSS}>{helperText}</FormHelperText>
  </FormControl>
)
export default SelectForm
