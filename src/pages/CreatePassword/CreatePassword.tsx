import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yup } from '@app/core'

import { mt } from '@common/common.styled'

import {
  ERROR_SOMETHING_WENT_WRONG,
  passwordRegExp,
  PUBLIC_PATHS,
} from '@constants'

import { useHandleRedirect } from '@hooks'

import { usePostUserPasswordUpdateMutation } from '@rtkApi/modules/__generated__/user'

import { styleButton, Styled } from './CreatePassword.styled'

type CreatePasswordTypes = {
  password: string
  confPassword: string
  showPassword: boolean
}

const defaultValues = {
  password: '',
  confPassword: '',
  showPassword: false,
}
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Введите пароль')
    .matches(
      passwordRegExp,
      'Пароль должен состоять только из символов набора BASE-64',
    )
    .min(8, 'Слишком короткий пароль, минимум 8 символов')
    .max(16, 'Слишком длинный пароль, максимум 16 символов'),
  confPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const CreatePassword = () => {
  const [opened, setOpened] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfPassword, setShowConfPassword] = React.useState(false)

  const handleRedirect = useHandleRedirect()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const userId = searchParams.get('id')
  const token = searchParams.get('token')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePasswordTypes>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const [apiUpdateRequest, { isLoading: isUpdateLoading }] =
    usePostUserPasswordUpdateMutation()

  const handleCreate = handleSubmit(async (data: CreatePasswordTypes) => {
    const { password, confPassword } = data

    try {
      if (!userId || !token) {
        throw new Error(ERROR_SOMETHING_WENT_WRONG)
      }

      await apiUpdateRequest({
        employeePasswordUpdateDto: {
          userId: +userId,
          token,
          password,
          confPassword,
        },
      }).unwrap()
      setOpened(true)
    } catch (error) {
      toast.error('Пользователь не найден.')
    }
  })

  return (
    <Styled.Root>
      {!opened ? (
        <form onSubmit={handleCreate}>
          <Grid container css={mt(30)} justifyContent="center" spacing={2}>
            <Grid container item spacing={2} xs={4}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid container item justifyContent="center" xs={12}>
                  <Grid item>
                    <Typography variant="h5">
                      Создайте пароль учетной записи
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item spacing={3} xs={7}>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() =>
                                    setShowPassword(!showPassword)
                                  }>
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.password?.message)}
                          helperText={
                            Boolean(errors.password?.message) &&
                            errors.password?.message
                          }
                          placeholder="Пароль"
                          type={showPassword ? 'text' : 'password'}
                          value={value}
                          variant="outlined"
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item css={mt(20)} xs={12}>
                    <Controller
                      control={control}
                      name="confPassword"
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() =>
                                    setShowConfPassword(!showConfPassword)
                                  }>
                                  {showConfPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.confPassword?.message)}
                          helperText={
                            Boolean(errors.confPassword?.message) &&
                            errors.confPassword?.message
                          }
                          placeholder="Повторите пароль"
                          type={showConfPassword ? 'text' : 'password'}
                          value={value}
                          variant="outlined"
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item css={mt(20)} justifyContent="center" xs={12}>
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      variant="contained">
                      Сохранить
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>
          <Typography css={mt(20)} variant="h5">
            Пароль успешно сохранен Пожалуйста, авторизуйтесь
          </Typography>
          <Button
            fullWidth
            color="primary"
            css={styleButton}
            disabled={isUpdateLoading}
            type="submit"
            variant="contained"
            onClick={() => handleRedirect(PUBLIC_PATHS.auth)}>
            Авторизация
          </Button>
        </>
      )}
    </Styled.Root>
  )
}

export default CreatePassword
