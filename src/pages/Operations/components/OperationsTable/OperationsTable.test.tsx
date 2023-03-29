import React from 'react'

import { Nullable } from '@common/types/Nullable'
import { EOperationsType } from '@common/types/Operations'

import { DateHelper } from '@helpers'

import { OperationDrawerState } from '@pages/CreateOperations/redux/createOperation/types'

import { successGetFinancialOperationsGeneralView } from '@testEnv/mocks/api/financial'
import { fireEvent, render } from '@testEnv/utils'

import { OperationsTable } from './OperationsTable'
import * as T from './OperationsTable.types'
import { headerColumns } from './constants/headerColumns'

const testRow = { ...successGetFinancialOperationsGeneralView[0] }

const mockSetOperationDrawerState = jest
  .fn()
  .mockImplementation((payload) => ({ type: 'operationDrawer', payload }))

jest.mock('@pages/CreateOperations/redux/createOperation/slice', () => ({
  ...jest.requireActual('@pages/CreateOperations/redux/createOperation/slice'),
  setOperationDrawerState: (value: Nullable<OperationDrawerState>) =>
    mockSetOperationDrawerState(value),
}))

describe('<OperationsTable />', () => {
  const renderOperationsTable = ({ rows = [testRow] }: Partial<T.Props>) =>
    render(<OperationsTable rows={rows} />)

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('render correct table header', async () => {
    const { getByRole } = renderOperationsTable({})

    const table = getByRole('table')
    const headerCells = table.querySelectorAll('thead > tr > th')

    headerCells.forEach((node, index) => {
      expect(node).toContainHTML(headerColumns[index].title)
    })
  })

  test('render correct number of rows', async () => {
    const { getByRole } = renderOperationsTable({})

    const table = getByRole('table')
    const tableRows = table.querySelectorAll('tbody > tr')

    expect(tableRows.length).toEqual(1)
  })

  describe('when render row', () => {
    test(`render correct "${headerColumns[0].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[0]

      expect(cell).toContainHTML(
        DateHelper.formatServerDateToClient(testRow.dateOfPayment!),
      )
      expect(cell).toContainHTML(
        DateHelper.formatServerDateToClient(testRow.dateOfReceiving!),
      )
    })

    test(`render correct "${headerColumns[1].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[1]

      expect(cell).toContainHTML('План')
    })

    test(`render correct "${headerColumns[2].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[2]

      expect(cell).toContainHTML('Поступление')
    })

    test(`render correct "${headerColumns[3].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[3]

      expect(cell).toContainHTML(testRow.contractorName!)
    })

    test(`render correct "${headerColumns[4].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[4]

      expect(cell).toContainHTML(testRow.budgetItemName!)
    })

    test(`render correct "${headerColumns[5].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[5]

      expect(cell).toContainHTML('Вилки пластиковые')
    })

    test(`render correct "${headerColumns[6].title}" cell`, async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[6]

      expect(cell).toContainHTML('30 570')
    })
  })

  describe('when click on row', () => {
    it('should call action setOperationDrawerState with data of operation', async () => {
      const { getByRole } = renderOperationsTable({})

      const table = getByRole('table')
      const tableRows = table.querySelectorAll('tbody > tr')

      fireEvent.click(tableRows[0])

      expect(mockSetOperationDrawerState).toHaveBeenCalledWith({
        type: EOperationsType.PlannedOperation,
        title: 'Плановая операция',
        operationId: 2,
      })
    })
  })
})
