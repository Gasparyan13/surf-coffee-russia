import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthToken: build.mutation<
      PostApiAuthTokenApiResponse,
      PostApiAuthTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/token`,
        method: 'POST',
        body: queryArg.authenticationRequest,
      }),
    }),
    postApiAuthRefreshToken: build.mutation<
      PostApiAuthRefreshTokenApiResponse,
      PostApiAuthRefreshTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/refreshToken`,
        method: 'POST',
        params: { refreshToken: queryArg.refreshToken },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type PostApiAuthTokenApiResponse =
  /** status 200 Токен сгенерирован. */ UserInfoDto
export type PostApiAuthTokenApiArg = {
  authenticationRequest: AuthenticationRequest
}
export type PostApiAuthRefreshTokenApiResponse =
  /** status 200 Новый токен сгенерирован. */ UserInfoDto
export type PostApiAuthRefreshTokenApiArg = {
  /** Токена для обновления JWT токена */
  refreshToken: string
}
export type UserInfoDto = {
  token?: string
  refreshToken?: string
  roles?: string[]
}
export type AuthenticationRequest = {
  user: string
  password: string
}
export const {
  usePostApiAuthTokenMutation,
  usePostApiAuthRefreshTokenMutation,
} = injectedRtkApi
