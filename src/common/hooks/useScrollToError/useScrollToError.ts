import { useEffect } from 'react'

import { Nullable } from '@common/types/Nullable'

export const useScrollToError = (errors: any, errorSelector = 'Mui-error') => {
  useEffect(() => {
    let scrollTimer: Nullable<NodeJS.Timeout> = null

    if (Object.keys(errors)?.length > 0) {
      // move the search and scroll to the element at the end of the queue to make sure the errors are displayed
      scrollTimer = setTimeout(() => {
        const container = document.querySelector(`.${errorSelector}`)

        container?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [errorSelector, errors])
}
