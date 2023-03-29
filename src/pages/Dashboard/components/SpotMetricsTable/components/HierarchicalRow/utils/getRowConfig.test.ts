import { getRowConfig, GetRowConfig } from './getRowConfig'

describe('getRowConfig()', () => {
  const callGetRowConfig = ({ index = 0, level = 0 }: Partial<GetRowConfig>) =>
    getRowConfig({
      index,
      level,
    })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render "0" level row', () => {
    it('should NOT render "top" border if "index=0"', async () => {
      const { hasBorderTop } = callGetRowConfig({ level: 0, index: 0 })

      expect(hasBorderTop).toEqual(false)
    })

    it('should NOT render "top" border if "index=0"', async () => {
      const { hasBorderTop } = callGetRowConfig({
        level: 0,
        index: 0,
      })

      expect(hasBorderTop).toEqual(false)
    })

    it('should render "top" border if "index" NOT 0', async () => {
      const { hasBorderTop } = callGetRowConfig({
        level: 0,
        index: 1,
      })

      expect(hasBorderTop).toEqual(true)
    })

    it('should NOT render "left" padding', async () => {
      const { hasPaddingLeft } = callGetRowConfig({ level: 1 })

      expect(hasPaddingLeft).toEqual(false)
    })
  })

  describe('when render "1" level row', () => {
    it('should render "top" border', async () => {
      const { hasBorderTop } = callGetRowConfig({ level: 1 })

      expect(hasBorderTop).toEqual(true)
    })

    it('should NOT render "left" padding', async () => {
      const { hasPaddingLeft } = callGetRowConfig({ level: 1 })

      expect(hasPaddingLeft).toEqual(false)
    })
  })

  describe('when render "2" level row', () => {
    it('should NOT render "top" border', async () => {
      const { hasBorderTop } = callGetRowConfig({ level: 2 })

      expect(hasBorderTop).toEqual(false)
    })

    it('should render "left" padding', async () => {
      const { hasPaddingLeft } = callGetRowConfig({ level: 2 })

      expect(hasPaddingLeft).toEqual(true)
    })
  })
})
