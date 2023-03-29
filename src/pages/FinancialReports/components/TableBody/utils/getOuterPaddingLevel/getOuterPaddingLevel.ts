import { isRoot, hasNoIcon } from '../checkup'

export const getOuterPaddingLevel = (level: number, hasChildren?: boolean) => {
  const offset = 16
  const multiplier = hasChildren ? level : level - 1

  if (hasNoIcon(level, hasChildren)) return 0
  if (isRoot(level) || isRoot(multiplier)) return offset

  return offset * multiplier
}
