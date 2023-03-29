import React, { useEffect, useRef } from 'react'

import { Nullable } from '@common/types/Nullable'

import { SearchField } from '@uiKit'

import * as Styled from './SidebarHeaderSearchCell.styled'
import * as T from './SidebarHeaderSearchCell.types'

export const SidebarHeaderSearchCell: React.FC<T.Props> = ({
  value,
  onChange,
}) => {
  const ref = useRef<Nullable<HTMLDivElement>>(null)

  // prevent "fixed-data-table-2" table scroll behavior and leave only default input scroll
  useEffect(() => {
    const onScroll = (e: MouseEvent) => {
      e?.stopPropagation()
    }

    ref.current?.addEventListener('wheel', onScroll)

    return () => {
      ref.current?.removeEventListener('wheel', onScroll)
    }
  }, [ref.current])

  return (
    <Styled.Root ref={ref}>
      <SearchField value={value} onChange={onChange} />
    </Styled.Root>
  )
}
