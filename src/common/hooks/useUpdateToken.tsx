import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAuthTokenInfo } from '@store/deprecated/modules/app/selectors'

// const SECOND = 1000

// TODO this hook does not work, try to test and decide what to do with it
export const useUpdateToken = () => {
  const authTokenInfo = useSelector(getAuthTokenInfo)

  useEffect(() => {
    const expirationTimeStamp = authTokenInfo?.exp
    if (expirationTimeStamp) {
      // const expireIn = expirationTimeStamp * SECOND - new Date().getTime()
      // setTimeout(() => {
      //   logout()
      // }, expireIn - 15 * SECOND)
    }
  }, [authTokenInfo])
}
