import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField, Typography } from '@mui/material'
import decode from 'jwt-decode'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yup } from '@app/core'

import { mb } from '@common/common.styled'
import { PATHS } from '@common/constants'
import { APP_NAME } from '@common/constants/officials'
import { useHandleRedirect } from '@common/hooks'

import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from '@rtkApi/core/constants'
import {
  PostApiAuthTokenApiResponse,
  usePostApiAuthTokenMutation,
} from '@rtkApi/modules/__generated__/api'

import { setAuthTokenInfo } from '@store/deprecated/modules/app/actions'
import { AuthTokenInfo } from '@store/deprecated/modules/app/types'
import { useAppDispatch } from '@store/rootConfig'

import { Styled } from './AuthPage.styled'

type AuthPageForm = {
  user: string
  password: string
}

const defaultValues = {
  user: '',
  password: '',
}

const schema = yup.object().shape({
  user: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
})

const caption = 'Авторизация'

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleRedirect = useHandleRedirect()

  const [apiPostApiAuthToken, { isLoading: isLoadingAuth }] =
    usePostApiAuthTokenMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthPageForm>({ defaultValues, resolver: yupResolver(schema) })

  useEffect(() => {
    if (localStorage.getItem(LS_ACCESS_TOKEN)) handleRedirect(PATHS.main)
  }, [])

  const handleAuth = handleSubmit(async (data: AuthPageForm) => {
    const { user, password } = data

    try {
      const loginData: PostApiAuthTokenApiResponse = await apiPostApiAuthToken({
        authenticationRequest: { user, password },
      }).unwrap()

      dispatch(setAuthTokenInfo(decode<AuthTokenInfo>(loginData.token!)))

      localStorage.setItem(LS_ACCESS_TOKEN, loginData.token!)
      localStorage.setItem(LS_REFRESH_TOKEN, loginData.refreshToken!)

      handleRedirect(PATHS.main)
    } catch (error) {
      toast.error('Ошибка авторизации')
    }
  })

  return (
    <Styled.Root>
      <Helmet defer={false}>
        <title>
          {APP_NAME} - {caption}
        </title>
        <meta content={caption || ''} name={caption || ''} />
      </Helmet>
      <form onSubmit={handleAuth}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid container item spacing={2} xs={8}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid container item css={mb(30)} justifyContent="center" xs={12}>
                <Grid item>
                  <Typography variant="h5">Введите логин и пароль</Typography>
                </Grid>
              </Grid>
              <Grid container item spacing={3} xs={7}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="user"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        error={Boolean(errors.user?.message)}
                        helperText={
                          Boolean(errors.user?.message) && errors.user?.message
                        }
                        placeholder="Адрес электронной почты"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        error={Boolean(errors.password?.message)}
                        helperText={
                          Boolean(errors.password?.message) &&
                          errors.password?.message
                        }
                        placeholder="Пароль"
                        size="small"
                        type="password"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Grid item xs={8}>
                      <Button
                        fullWidth
                        color="primary"
                        disabled={isLoadingAuth}
                        type="submit"
                        variant="contained">
                        Войти
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Styled.Root>
  )
}
