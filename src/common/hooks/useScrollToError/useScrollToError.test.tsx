import React from 'react'

import { render, waitFor } from '@testEnv/utils'

import { useScrollToError } from './useScrollToError'

const errors = {
  contractor: {
    message: 'Не указан контрагент',
    type: 'typeError',
    ref: {
      name: 'contractor',
    },
  },
}

const Component: React.FC<{ isError: boolean }> = ({ isError }) => {
  useScrollToError(isError ? errors : {})

  const getClasses = isError ? 'Mui-error' : ''

  return <div className={`MuiInputBase-root ${getClasses}`} />
}

describe('useScrollToError()', () => {
  const scrollIntoViewMock = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

  it('should not scroll to error, if errors empty', () => {
    render(<Component isError={false} />)

    expect(scrollIntoViewMock).not.toBeCalled()
  })

  it('should scroll to error, if errors is not empty', async () => {
    render(<Component isError />)

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled()
    })
  })
})
