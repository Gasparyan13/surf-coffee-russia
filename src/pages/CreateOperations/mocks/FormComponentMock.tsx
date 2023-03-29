import React, { forwardRef, useImperativeHandle } from 'react'

import { RefType } from '@pages/CreateOperations/containers/Main/Main.types'

export type Props = { onComplete: (pathnames?: string | string[]) => void }

export const MockFormComponentProps = forwardRef<RefType, Props>(
  ({ onComplete }, ref) => {
    useImperativeHandle(ref, () => ({
      onSubmit: () => Promise.resolve(),
      isDirty: false,
    }))

    return (
      <button type="button" onClick={() => onComplete([])}>
        update table
      </button>
    )
  },
)
