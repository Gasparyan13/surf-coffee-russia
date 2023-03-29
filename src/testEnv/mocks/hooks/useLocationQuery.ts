export type MockUseLocationQueryParams = {
  urlParams: { [k: string]: string }
  set?: (k: string) => void
}

export const mockUseLocationQuery =
  ({ urlParams, set = () => {} }: MockUseLocationQueryParams) =>
  () => ({
    get: (key: keyof typeof urlParams) => urlParams[key],
    set,
  })
