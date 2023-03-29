import { useCallback, useLayoutEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type ParamKey = string
type ParamValue = number | string | boolean | null
export type UseLocationQueryParam = { key: ParamKey; value: ParamValue }
export type UseLocationQueryParamWithPath = UseLocationQueryParam & {
  pathname: string
}

type Props = {
  defaultParams?: UseLocationQueryParamWithPath[]
  onChange?: (key: string, value: string | null) => void
}

export const useLocationQuery = (props?: Props) => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const set = useCallback(
    (param: UseLocationQueryParam | UseLocationQueryParam[]): void => {
      const params = new URLSearchParams(search)
      const multipleParam = Array.isArray(param) ? param : [param]

      multipleParam.forEach(({ key, value }) => {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, `${value}`)
        }
        if (props?.onChange)
          props.onChange(key, value === null ? value : `${value}`)
      })

      navigate({ pathname, search: params.toString() })
    },
    [search, navigate, pathname, props],
  )

  const get = useCallback(
    (key: string) => {
      const params = new URLSearchParams(search)

      return params.get(key)
    },
    [search],
  )

  const setIfEmpty = useCallback(
    (
      param: UseLocationQueryParamWithPath | UseLocationQueryParamWithPath[],
    ): void => {
      const params = new URLSearchParams(search)
      const multipleParam = Array.isArray(param) ? param : [param]

      multipleParam.forEach(({ key, value, pathname: curPathname }) => {
        const queryValue = get(key)

        if (curPathname === pathname && !queryValue) {
          params.set(key, `${value}`)
        }

        if (props?.onChange) props.onChange(key, queryValue || `${value}`)
      })

      navigate({ pathname, search: params.toString() })
    },
    [search, navigate, pathname, get, props],
  )

  useLayoutEffect(() => {
    // check if the default parameter exists, and if the parameter does not exist, set it to default value
    if (props?.defaultParams?.length) setIfEmpty(props.defaultParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search])

  return useMemo(() => ({ get, set }), [get, set])
}
