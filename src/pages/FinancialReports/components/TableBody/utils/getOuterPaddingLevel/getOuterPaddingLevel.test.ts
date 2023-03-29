import { getOuterPaddingLevel } from './getOuterPaddingLevel'

const rootLevel = 2
const basePadding = 16

describe('getOuterPaddingLevel()', () => {
  it('should return "0" if item is ROOT and has NO children', () => {
    const padding = getOuterPaddingLevel(rootLevel, false)

    expect(padding).toEqual(0)
  })

  it('should return "basePadding" if item is ROOT and has children', () => {
    const padding = getOuterPaddingLevel(rootLevel, true)

    expect(padding).toEqual(basePadding)
  })

  it('should return "basePadding" if item is next from ROOT', () => {
    const padding = getOuterPaddingLevel(rootLevel + 1, false)

    expect(padding).toEqual(basePadding)
  })

  it('should return "basePadding * (level - 1)" in other cases', () => {
    const padding = getOuterPaddingLevel(4)

    expect(padding).toEqual(48)
  })
})
