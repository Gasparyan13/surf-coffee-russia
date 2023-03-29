import { SELECTED_SELECTOR } from '@uiKit/components/ListRow/constants/selectors'

import { ITEM_HEIGHT } from '../constants/sizes'
import { getRelativeOffsetTop } from './getters'

export const scrollToSelectedBudgetItem = () => {
  const listbox = document.querySelector(
    '.MuiAutocomplete-listbox',
  ) as HTMLElement

  if (listbox) {
    const selectedOption = listbox.querySelector(
      `.${SELECTED_SELECTOR}`,
    ) as HTMLElement

    if (selectedOption) {
      listbox.scrollTop =
        getRelativeOffsetTop(listbox, selectedOption) - ITEM_HEIGHT * 2
    }
  }
}
