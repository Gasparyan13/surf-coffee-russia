/* eslint-disable no-promise-executor-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const tick = () => new Promise((res) => setImmediate(res))

export const advanceTimersByTime = async (ms = 1) =>
  jest.advanceTimersByTime(ms) && (await tick())

export const runOnlyPendingTimers = async () =>
  jest.runOnlyPendingTimers() && (await tick())

export const runAllTimers = async () => jest.runAllTimers() && (await tick())
