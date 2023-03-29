import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUserResetPassword: build.mutation<
      PostUserResetPasswordApiResponse,
      PostUserResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/user/reset_password`,
        method: 'POST',
        body: queryArg.resetPasswordDto,
      }),
    }),
    postUserPasswordUpdate: build.mutation<
      PostUserPasswordUpdateApiResponse,
      PostUserPasswordUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/password_update`,
        method: 'POST',
        body: queryArg.employeePasswordUpdateDto,
      }),
    }),
    getUserRoles: build.query<GetUserRolesApiResponse, GetUserRolesApiArg>({
      query: () => ({ url: `/user/roles` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type PostUserResetPasswordApiResponse =
  /** status 200 Ссылка для сброса пароля отправлена на почту. */ string
export type PostUserResetPasswordApiArg = {
  resetPasswordDto: ResetPasswordDto
}
export type PostUserPasswordUpdateApiResponse =
  /** status 200 Пароль пользователя успешно обновлен. */ string
export type PostUserPasswordUpdateApiArg = {
  employeePasswordUpdateDto: EmployeePasswordUpdateDto
}
export type GetUserRolesApiResponse =
  /** status 200 Роли успешно экспортированы. */ RoleDto[]
export type GetUserRolesApiArg = void
export type ResetPasswordDto = {
  email?: string
}
export type EmployeePasswordUpdateDto = {
  userId?: number
  token?: string
  password?: string
  confPassword?: string
}
export type RoleDto = {
  id?: number
  name?: string
}
export const {
  usePostUserResetPasswordMutation,
  usePostUserPasswordUpdateMutation,
  useGetUserRolesQuery,
  useLazyGetUserRolesQuery,
} = injectedRtkApi
