import { setupServer } from '@testEnv/server'
import {
  mockGetFinancialUsedCapitalAssets,
  mockHeadUsedCapitalAssetsApiResponse,
} from '@testEnv/server/handlers/financial'
import { renderHook, waitFor } from '@testEnv/utils'

import { useGetUsedCapitalAssets } from './useGetUsedCapitalAssets'

const createServer = () =>
  setupServer(
    mockHeadUsedCapitalAssetsApiResponse(),
    mockGetFinancialUsedCapitalAssets(),
  )

describe('useGetUsedCapitalAssets()', () => {
  const server = createServer()

  const renderUseGetUsedCapitalAssets = (
    hasAdditionalFieldsCapitalAssets = false,
  ) =>
    renderHook(() => useGetUsedCapitalAssets(hasAdditionalFieldsCapitalAssets))

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  it('should NOT send request if hasAdditionalFieldsCapitalAssets is false', async () => {
    const requestSpy = jest.fn()

    const { result } = renderUseGetUsedCapitalAssets()

    server.events.on('request:end', requestSpy)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(0))

    expect(result.current.length).toEqual(0)
  })

  it('should send request if hasAdditionalFieldsCapitalAssets is true', async () => {
    const requestSpy = jest.fn()

    renderUseGetUsedCapitalAssets(true)

    server.events.on('request:end', requestSpy)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })

  it('should render items if UsedCapitalAssets is NOT empty', async () => {
    const requestSpy = jest.fn()

    const { result } = renderUseGetUsedCapitalAssets(true)

    server.events.on('request:end', requestSpy)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    await waitFor(() => {
      expect(result.current.length).toEqual(3)
    })

    expect(result.current).toEqual([
      {
        key: 'Водонагреватель',
        label: 'Водонагреватель',
        value: 'Водонагреватель',
      },
      {
        key: 'Кофемашина',
        label: 'Кофемашина',
        value: 'Кофемашина',
      },
      {
        key: 'Холодильник',
        label: 'Холодильник',
        value: 'Холодильник',
      },
    ])
  })

  it('should NOT render items if UsedCapitalAssets is empty', async () => {
    const requestSpy = jest.fn()

    server.use(mockGetFinancialUsedCapitalAssets([]))

    const { result } = renderUseGetUsedCapitalAssets(true)

    server.events.on('request:end', requestSpy)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    expect(result.current.length).toEqual(0)
  })
})
