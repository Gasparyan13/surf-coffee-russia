import { screen, waitFor } from '@testing-library/react'

export const waitForProgressBarComplete = async () => {
  await waitFor(async () => {
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  await waitFor(async () => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
}
