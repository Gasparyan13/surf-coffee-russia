import { amountRegexp } from '@constants'

export const getIsPrice = (payRate: string) => {
  let result = amountRegexp.test(payRate)
  if (payRate.startsWith('0')) result = result && payRate.split('')[1] === '.'
  if (payRate.startsWith('.')) result = false

  return result
}
