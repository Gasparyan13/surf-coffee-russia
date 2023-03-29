import React from 'react'

import { render } from '@testEnv/utils'

import { CellText } from './CellText'
import * as T from './CellText.types'

describe('<CellText />', () => {
  const TEST_BIG_NUMBER_TEXT = '999999'
  const TEST_TEXT = '100.99'
  const INT_TEST_TEXT = TEST_TEXT.split('.')[0]

  const renderCellText = ({
    text,
    type = 'REGULAR',
    tableColumnType = 'MAIN',
    isEditable,
    numberFormat,
    isNumber,
    disabled,
  }: Partial<T.Props>) =>
    render(
      <CellText
        disabled={disabled}
        isEditable={isEditable}
        isNumber={isNumber}
        numberFormat={numberFormat}
        tableColumnType={tableColumnType}
        text={text}
        type={type}
      />,
    )

  describe('when render content', () => {
    describe('when "isNumber=true"', () => {
      it('should format text', async () => {
        const { getByText } = renderCellText({
          isNumber: true,
          text: TEST_BIG_NUMBER_TEXT,
        })

        expect(getByText('999 999')).toBeInTheDocument()
      })

      it('should format text to "integer" number format by default', async () => {
        const { getByText } = renderCellText({
          isNumber: true,
          text: TEST_TEXT,
        })

        expect(getByText(INT_TEST_TEXT)).toBeInTheDocument()
      })

      it('should format text to "float" number format', async () => {
        const { getByText } = renderCellText({
          isNumber: true,
          text: TEST_TEXT,
          numberFormat: 'float',
        })

        expect(getByText(TEST_TEXT)).toBeInTheDocument()
      })
    })

    describe('when "isNumber=false"', () => {
      it('should render text without formatting', async () => {
        const { getByText } = renderCellText({
          isNumber: false,
          text: TEST_BIG_NUMBER_TEXT,
        })

        expect(getByText(TEST_BIG_NUMBER_TEXT)).toBeInTheDocument()
      })
    })

    describe('when render text container', () => {
      it('should render "BOLD" style container', async () => {
        const { getByText } = renderCellText({
          isNumber: false,
          text: TEST_BIG_NUMBER_TEXT,
          type: 'BOLD',
        })

        expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
          'font-weight',
          '700',
        )
      })

      it('should render "TITLE" style container', async () => {
        const { getByText } = renderCellText({
          isNumber: false,
          text: TEST_BIG_NUMBER_TEXT,
          type: 'TITLE',
        })

        expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
          'font-weight',
          '400',
        )
      })

      it('should render "REGULAR" style container', async () => {
        const { getByText } = renderCellText({
          isNumber: false,
          text: TEST_BIG_NUMBER_TEXT,
          type: 'REGULAR',
        })

        expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
          'font-weight',
          '400',
        )
      })

      describe('when "disabled"', () => {
        it('should render disabled "BOLD" style container', async () => {
          const { getByText } = renderCellText({
            isNumber: false,
            disabled: true,
            text: TEST_BIG_NUMBER_TEXT,
            type: 'BOLD',
          })

          expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
            'color',
            '#979797',
          )
        })

        it('should render disabled "TITLE" style container', async () => {
          const { getByText } = renderCellText({
            isNumber: false,
            disabled: true,
            text: TEST_BIG_NUMBER_TEXT,
            type: 'TITLE',
          })

          expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
            'color',
            '#979797',
          )
        })

        it('should render disabled "REGULAR" style container', async () => {
          const { getByText } = renderCellText({
            isNumber: false,
            disabled: true,
            text: TEST_BIG_NUMBER_TEXT,
            type: 'REGULAR',
          })

          expect(getByText(TEST_BIG_NUMBER_TEXT)).toHaveStyleRule(
            'color',
            '#979797',
          )
        })
      })
    })
  })
})
