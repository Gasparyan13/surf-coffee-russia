import React from 'react'

import { EnterpriseWorkerViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { configWorkerEmployeeCtxValue } from '@testEnv/mocks/providers/workerEmployeeProvider'
import { fireEvent, render } from '@testEnv/utils'

import { WorkerEmployeeProvider } from '../../containers/WorkersEmployeeCtx'
import { EmployeesListTable } from './EmployeesListTable'
import { headerColumns } from './constants/tableHeader'

const testWorker: EnterpriseWorkerViewDto = {
  id: 1,
  firstAndLastName: 'test name',
  roleName: 'test role',
  enterpriseName: 'test enterprise name',
  payRate: 1000,
}

describe('<EmployeesListTable />', () => {
  const mockSetEmployeeId = jest.fn()

  const renderEmployeesListTable = () =>
    render(
      <WorkerEmployeeProvider
        value={configWorkerEmployeeCtxValue({
          setEmployeeId: mockSetEmployeeId,
        })}>
        <EmployeesListTable maxHeight={500} workersData={[testWorker]} />
      </WorkerEmployeeProvider>,
    )

  test('render correct table header', async () => {
    const { getByRole } = renderEmployeesListTable()

    const table = getByRole('table')
    const headerCells = table.querySelectorAll('thead > tr > th')

    headerCells.forEach((node, index) => {
      expect(node).toContainHTML(headerColumns[index].title)
    })
  })

  test('render correct number of rows', async () => {
    const { getByRole } = renderEmployeesListTable()

    const table = getByRole('table')
    const tableRows = table.querySelectorAll('tbody > tr')

    expect(tableRows.length).toEqual(1)
  })

  it('should set EmployeeId by click on row', async () => {
    const { getByText } = renderEmployeesListTable()

    fireEvent.click(getByText(testWorker.enterpriseName!))

    expect(mockSetEmployeeId).toHaveBeenCalledTimes(1)
    expect(mockSetEmployeeId).toHaveBeenCalledWith(testWorker.id)
  })
})
