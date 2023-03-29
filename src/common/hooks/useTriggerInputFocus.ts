import React, { useCallback, useRef } from 'react'

type Return = {
  inputRef: React.RefObject<HTMLInputElement>
  triggerInputRef: () => void
}

export const useTriggerInputFocus = (): Return => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const triggerInputRef = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return { inputRef, triggerInputRef }
}
