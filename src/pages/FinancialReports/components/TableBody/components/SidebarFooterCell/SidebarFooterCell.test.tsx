import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { render, waitFor } from '@testEnv/utils'

import { SidebarFooterCell } from './SidebarFooterCell'
import * as T from './SidebarFooterCell.types'
import { PLACEHOLDER_NO_SEARCH_RESULTS } from './constants/placeholders'

describe('<SidebarFooterCell />', () => {
  const renderSidebarFooterCell = ({
    hasBorder = false,
    showPlaceholder = false,
  }: Partial<T.Props>) =>
    render(
      <SidebarFooterCell
        hasBorder={hasBorder}
        showPlaceholder={showPlaceholder}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should NOT render placeholder', async () => {
    const { queryByText } = renderSidebarFooterCell({
      showPlaceholder: false,
    })

    await waitFor(async () => {
      expect(queryByText(PLACEHOLDER_NO_SEARCH_RESULTS)).not.toBeInTheDocument()
    })
  })

  it('should render placeholder', async () => {
    const { getByText } = renderSidebarFooterCell({
      showPlaceholder: true,
    })

    expect(getByText(PLACEHOLDER_NO_SEARCH_RESULTS)).toBeInTheDocument()
  })

  it('should NOT render border', async () => {
    const { getByText } = renderSidebarFooterCell({
      showPlaceholder: true,
      hasBorder: false,
    })

    expect(
      getByText(PLACEHOLDER_NO_SEARCH_RESULTS).parentElement,
    ).not.toHaveStyleRule(
      'border-right',
      `1px solid ${theme.colors.asphaltLight}`,
    )
  })

  it('should render border', async () => {
    const { getByText } = renderSidebarFooterCell({
      showPlaceholder: true,
      hasBorder: true,
    })

    expect(
      getByText(PLACEHOLDER_NO_SEARCH_RESULTS).parentElement,
    ).toHaveStyleRule('border-right', `1px solid ${theme.colors.asphaltLight}`)
  })
})
