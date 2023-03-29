import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yup } from '@app/core'

import { mb, mt } from '@common/common.styled'

import { GoBackContainer } from '@components'

import { RequiredField } from '@ui'

import { Styled } from './AddAdminPage.styled'

type AddAdminForm = {
  name: string
  surname: string
  mid_name: string
  mid_name_exists: boolean
  email: string
  password: string
  conf_password: string
}

const schema = yup.object().shape({
  name: yup.string().required('Введите имя'),
  surname: yup.string().required('Введите фамилию'),
  email: yup
    .string()
    .email('Введите корректный адрес')
    .required('Введите электронную почту'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Слишком короткий пароль, минимум 8 символов')
    .max(16, 'Слишком длинный пароль, максимум 16 символов'),
  mid_name_exists: yup.boolean(),
  mid_name: yup.string().when('mid_name_exists', {
    is: false,
    then: yup.string().required('Введите отчество'),
  }),
  conf_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const defaultValues = {
  name: '',
  surname: '',
  mid_name: '',
  mid_name_exists: false,
  email: '',
  password: '',
  conf_password: '',
}

export const AddAdminPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddAdminForm>({ resolver: yupResolver(schema), defaultValues })

  const midNameExists = watch('mid_name_exists')

  const handleAddAdmin = handleSubmit(async () => {
    try {
      window.location.reload()
    } catch (error) {
      toast.error('Ошибка добавления администратора')
    }
  })

  return (
    <GoBackContainer>
      <Styled.Root>
        <form onSubmit={handleAddAdmin}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid container item css={mb(30)} justifyContent="center" xs={12}>
              <Grid item>
                <Typography variant="h5">Создать администратора</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={3} xs={7}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField>
                      <TextField
                        fullWidth
                        error={Boolean(errors.name?.message)}
                        helperText={
                          Boolean(errors.name?.message) && errors.name?.message
                        }
                        placeholder="Имя"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="surname"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField>
                      <TextField
                        fullWidth
                        error={Boolean(errors.surname?.message)}
                        helperText={
                          Boolean(errors.surname?.message) &&
                          errors.surname?.message
                        }
                        placeholder="Фамилия"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="mid_name"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField disabled={midNameExists}>
                      <TextField
                        fullWidth
                        disabled={midNameExists}
                        error={
                          !midNameExists && Boolean(errors.mid_name?.message)
                        }
                        helperText={
                          !midNameExists &&
                          Boolean(errors.mid_name?.message) &&
                          errors.mid_name?.message
                        }
                        placeholder="Отчество"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      control={control}
                      name="mid_name_exists"
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          checked={value}
                          onChange={(e, newValue) => {
                            onChange(newValue)
                            setValue('mid_name', '')
                          }}
                        />
                      )}
                    />
                  }
                  label="Нет отчества"
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField>
                      <TextField
                        fullWidth
                        error={Boolean(errors.email?.message)}
                        helperText={
                          Boolean(errors.email?.message) &&
                          errors.email?.message
                        }
                        placeholder="Корпоративная почта"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField>
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
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="conf_password"
                  render={({ field: { value, onChange } }) => (
                    <RequiredField>
                      <TextField
                        fullWidth
                        error={Boolean(errors.conf_password?.message)}
                        helperText={
                          Boolean(errors.conf_password?.message) &&
                          errors.conf_password?.message
                        }
                        placeholder="Повторите пароль"
                        size="small"
                        type="password"
                        value={value}
                        onChange={onChange}
                      />
                    </RequiredField>
                  )}
                />
              </Grid>
              <Grid container item css={mt(30)} justifyContent="center" xs={12}>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained">
                    Создать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Styled.Root>
    </GoBackContainer>
  )
}
