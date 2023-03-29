import { SelectChangeEvent } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { ReactNode, useCallback, useMemo } from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { mb, mt } from '@common/common.styled'

import { uuid } from '@helpers'

import { theme } from '@providers/ThemeProvider/theme'

import { HelperText, LabelText, ListRow } from '@uiKit'
import { TEST_ID_ARROW } from '@uiKit/components/SelectSingle/constants/testIds'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { LIST_ROW_HEIGHT } from '../ListRow/ListRow.styled'
import { Typography } from '../Typography'
import * as Styled from './SelectSingle.styled'
import * as T from './SelectSingle.types'

export const SelectSingle: React.FC<T.Props> = ({
  size = 'flex',
  variant = 'outlined',
  menus,
  placeholder,
  labelText,
  value,
  menuHeight = LIST_ROW_HEIGHT * 7,
  disabled,
  error,
  helperText,
  fullWidth = true,
  IconComponent,
  MenuProps = {},
  onChange,
  ...rest
}) => {
  const labelId = useMemo(() => uuid(), [])

  const menuProps = useMemo(
    () =>
      menuHeight
        ? {
            sx: {
              '.MuiList-root': {
                maxHeight: menuHeight,
              },
            },
            ...MenuProps,
          }
        : MenuProps,
    [menuHeight, MenuProps],
  )

  const handleChange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      if (onChange) onChange(e.target.value as string)
    },
    [onChange],
  )

  const renderIconComponent = useCallback(
    (iconProps: T.IconProps) => (
      <Styled.InputIcon $disabled={disabled}>
        {IconComponent ? (
          <IconComponent {...iconProps} />
        ) : (
          <SvgArrowIcon {...iconProps} {...createTestId(TEST_ID_ARROW)} />
        )}
      </Styled.InputIcon>
    ),
    [IconComponent, disabled],
  )

  return (
    <>
      {labelText && (
        <LabelText css={mb(8)} disabled={disabled} id={labelId}>
          {labelText}
        </LabelText>
      )}
      <Styled.MuiSelect
        displayEmpty
        $disabled={disabled}
        $error={error}
        $selectSize={size}
        IconComponent={renderIconComponent}
        MenuProps={menuProps}
        disabled={disabled}
        fullWidth={fullWidth}
        input={<OutlinedInput />}
        labelId={labelId}
        renderValue={(selected) => {
          const showPlaceholder =
            !selected || (Array.isArray(selected) && selected?.length === 0)
          return (
            <Typography
              color={showPlaceholder ? theme.colors.pencil : theme.colors.black}
              variant="Input">
              {showPlaceholder
                ? placeholder
                : (menus?.find(({ value: menuValue }) => menuValue === selected)
                    ?.text as ReactNode)}
            </Typography>
          )
        }}
        value={value}
        variant={variant}
        onChange={handleChange}
        {...rest}>
        {menus?.map(({ key, value: listRowValue, ...menuRest }) => (
          <ListRow
            key={key}
            isSelected={value === listRowValue}
            value={listRowValue}
            {...menuRest}
          />
        ))}
      </Styled.MuiSelect>
      {helperText && (
        <HelperText css={mt(8)} disabled={disabled} error={error} id={labelId}>
          {helperText}
        </HelperText>
      )}
    </>
  )
}
