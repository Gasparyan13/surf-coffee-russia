export const makeNumberedArray = (length: number, offset?: number) =>
  new Array(length).fill(0).map((_, i) => (offset ? i + offset : i))
