export type MockUseWindowSizeParams = {
  height: number
  width: number
}

const defaultResolution = {
  height: 1920,
  width: 1080,
}

export const mockUseWindowSize = (resolution?: MockUseWindowSizeParams) => () =>
  resolution ?? defaultResolution
