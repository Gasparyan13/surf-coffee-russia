import { makeNumberedArray } from '@common/helpers'

import { pathByTabIndex, tabIndexByPath } from '../constants/tabs'

export const getYearsOptions = (length: number, yearsAgoFromNow = 10) =>
  makeNumberedArray(
    length,
    new Date().getFullYear() - yearsAgoFromNow,
  ).reverse()

export const getTabIndexByPathname = (pathname: string) => {
  const [, tabIndex] =
    Object.entries(tabIndexByPath).find(([path]) => pathname.includes(path)) ??
    []

  return tabIndex ?? 0
}

export const getTabPathnameByIndex = (index: number) => pathByTabIndex[index]
