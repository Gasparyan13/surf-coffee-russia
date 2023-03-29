import React from 'react'

import { render, screen } from '@testEnv/utils'

import { CellContent } from './CellContent'
import * as T from './CellContent.types'
import { TEST_ID_ICON } from './constants/testIds'

describe('<CellContent />', () => {
  const renderCellContent = ({
    text = 'test',
    isNumber,
    type = 'REGULAR',
    isEditable,
    disabled,
    tableColumnType = 'MAIN',
  }: Partial<T.Props>) =>
    render(
      <CellContent
        disabled={disabled}
        isEditable={isEditable}
        isNumber={isNumber}
        tableColumnType={tableColumnType}
        text={text}
        type={type}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render content', () => {
    describe('when render text content', () => {
      it('should render text content', async () => {
        renderCellContent({})

        expect(screen.getByText('test')).toBeInTheDocument()
      })

      it('should NOT render text content if "text" is empty and is NOT editable', async () => {
        renderCellContent({ text: '', isEditable: false })

        expect(screen.queryByText('test')).not.toBeInTheDocument()
      })
    })

    describe('when render icon', () => {
      it('should render icon', async () => {
        renderCellContent({ text: '', isEditable: true })

        expect(screen.getByTestId(TEST_ID_ICON)).toBeInTheDocument()
      })

      it('should NOT render icon', async () => {
        renderCellContent({ text: '', isEditable: false })

        expect(screen.queryByTestId(TEST_ID_ICON)).not.toBeInTheDocument()
      })
    })

    it('should render empty content', async () => {
      renderCellContent({ text: '', isEditable: false })

      expect(screen.queryByText('test')).not.toBeInTheDocument()
      expect(screen.queryByTestId(TEST_ID_ICON)).not.toBeInTheDocument()
    })
  })
})
