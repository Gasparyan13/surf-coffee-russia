import React from 'react'
import Highlighter from 'react-highlight-words'

import { FONT_WEIGHT_BOLD } from '@uiKit/constants/fontWeight'

import * as T from './SearchTextHighlighter.types'
import { getSearchArray } from './utils/getters'

export const SearchTextHighlighter: React.FC<T.Props> = ({
  value = '',
  caseSensitive,
  searchWords,
}) => (
  <Highlighter
    autoEscape
    caseSensitive={caseSensitive}
    highlightStyle={{
      fontWeight: FONT_WEIGHT_BOLD,
      backgroundColor: 'transparent',
    }}
    searchWords={getSearchArray(searchWords)}
    textToHighlight={value}
  />
)
