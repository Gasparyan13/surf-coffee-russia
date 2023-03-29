export const isRoot = (level: number) => level === 2

export const hasNoIcon = (level: number, hasChildren?: boolean) =>
  isRoot(level) && !hasChildren
