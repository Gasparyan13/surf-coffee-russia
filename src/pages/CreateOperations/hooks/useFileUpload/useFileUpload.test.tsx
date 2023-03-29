import { act } from '@testing-library/react-hooks'
import React, { useEffect } from 'react'

import { successGetFinancialOperationsByOperationId } from '@testEnv/mocks/api/financial'
import { setupServer } from '@testEnv/server'
import {
  mockGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilename,
  mockPostFinancialDocument,
  mockPostFinancialDocumentByType,
} from '@testEnv/server/handlers/financial'
import { fireEvent, render, renderHook, waitFor } from '@testEnv/utils'

import { useFileUpload } from './useFileUpload'
import * as T from './useFileUpload.types'

const testFile = new File(
  [],
  successGetFinancialOperationsByOperationId.document!.fileName!,
)

const MockComponent: React.FC<Partial<T.UseFileUploadParams>> = ({
  currentFile = null,
}) => {
  const { handleOpenFileInNewTab, handleWatchApiDocument } = useFileUpload({
    currentFile,
  })

  useEffect(() => {
    handleWatchApiDocument({
      file: testFile,
      info: successGetFinancialOperationsByOperationId.document!,
    })
  }, [])

  return (
    <button type="button" onClick={handleOpenFileInNewTab}>
      Open
    </button>
  )
}

const createServer = () =>
  setupServer(
    mockPostFinancialDocument(
      successGetFinancialOperationsByOperationId.document!,
      200,
    ),
    mockPostFinancialDocumentByType(
      successGetFinancialOperationsByOperationId.document!.fileName!,
    ),
    mockGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilename(),
  )

describe('useFileUpload()', () => {
  const server = createServer()

  const renderUseFileUpload = ({
    currentFile = null,
  }: Partial<T.UseFileUploadParams>) =>
    renderHook((rerenderProps: Partial<T.UseFileUploadParams>) =>
      useFileUpload({
        currentFile,
        ...rerenderProps,
      }),
    )

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  it('should NOT call API if same file', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    const { result } = renderUseFileUpload({ currentFile: testFile })

    act(() => {
      result.current.handleWatchApiDocument({
        file: testFile,
        info: successGetFinancialOperationsByOperationId.document!,
      })
    })

    expect(result.current.isApiDocument).toEqual(true)

    await act(async () => {
      await result.current.handleUploadDocument({
        documentType: 'WAYBILL',
        document: testFile,
      })
    })

    expect(requestSpy).toHaveBeenCalledTimes(0)
  })

  it('should call API if file changed', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    const { result, rerender } = renderUseFileUpload({
      currentFile: testFile,
    })

    act(() => {
      result.current.handleWatchApiDocument({
        file: testFile,
        info: successGetFinancialOperationsByOperationId.document!,
      })
    })

    rerender({ currentFile: new File([], 'test') })

    await waitFor(() => expect(result.current.isApiDocument).toEqual(false))

    await act(async () => {
      await result.current.handleUploadDocument({
        documentType: 'WAYBILL',
        document: testFile,
      })
    })

    expect(requestSpy).toHaveBeenCalledTimes(2)
  })

  describe('when call "handleOpenFileInNewTab"', () => {
    let windowOpenSpy = jest.spyOn(window, 'open')

    beforeEach(() => {
      windowOpenSpy = jest.spyOn(window, 'open')
      global.URL.createObjectURL = jest.fn()
      global.URL.revokeObjectURL = jest.fn()
    })

    afterEach(() => {
      windowOpenSpy.mockRestore()
    })

    it('should open file in new tab', async () => {
      const requestSpy = jest.fn()

      windowOpenSpy.mockImplementation(jest.fn())

      server.events.on('request:end', requestSpy)
      const { result } = renderUseFileUpload({
        currentFile: testFile,
      })

      act(() => {
        result.current.handleWatchApiDocument({
          file: testFile,
          info: successGetFinancialOperationsByOperationId.document!,
        })
      })

      await waitFor(() => expect(result.current.isApiDocument).toEqual(true))

      await act(async () => {
        await result.current.handleOpenFileInNewTab()
      })

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(windowOpenSpy).toHaveBeenCalledTimes(1)
    })

    it('should display error', async () => {
      server.use(
        mockGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilename(403),
      )

      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { getByText } = render(<MockComponent />)

      fireEvent.click(getByText('Open'))

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      expect(getByText('Ошибка чтения файла.')).toBeInTheDocument()
    })
  })
})
