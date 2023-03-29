const getQuery = (value: number): string => `(max-width:${value}px)`

export const BREAKPOINTS: Record<string, { value: number; query: string }> = {
  xs: { value: 0, query: getQuery(0) },
  // Not standard mui breakpoint, designers didn't approve breakpoints at all
  sm: { value: 480, query: getQuery(480) },
  md: { value: 960, query: getQuery(960) },
  lg: { value: 1280, query: getQuery(1280) },
  xl: { value: 1920, query: getQuery(1920) },
}
