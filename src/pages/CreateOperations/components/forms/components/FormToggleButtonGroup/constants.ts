import { EPurchaseSale, EWriteOffReceipt } from './enums'

export const TOGGLE_BUTTON_PRESETS = {
  writeOffReceipt: [
    { label: 'Списание', value: EWriteOffReceipt.WriteOff },
    { label: 'Поступление', value: EWriteOffReceipt.Receipt },
  ],
  purchaseSale: [
    { label: 'Покупка', value: EPurchaseSale.Purchase },
    { label: 'Продажа', value: EPurchaseSale.Sale },
  ],
}
