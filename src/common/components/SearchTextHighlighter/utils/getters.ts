export const getSearchArray = (searchWords?: string | string[]): string[] => {
  if (!searchWords) return []

  return Array.isArray(searchWords) ? searchWords : [searchWords]
}
