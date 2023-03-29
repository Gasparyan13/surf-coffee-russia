export const getMergedTheme =
  <T>(newTheme: Record<string, unknown>) =>
  (ancestorTheme: T): any => ({
    ...ancestorTheme,
    ...newTheme,
  })
