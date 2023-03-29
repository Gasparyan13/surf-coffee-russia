import { CircularProgress } from '@mui/material'
import { Table } from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import React, { useLayoutEffect, useRef, useState } from 'react'

import { useWindowSize } from '@hooks'

import * as Styled from './TableBody.styled'
import * as T from './TableBody.types'

export const TableBody: React.FC<T.Props> = ({
  rowsCount,
  isLoading,
  scrollToColumn,
  children,
  maxWidth,
  rowHeight = 42,
  headerHeight = 100,
  tableOverwriteCSS,
  rootOverwriteCSS = Styled.fullWidthShadowCSS,
  showScrollbarX,
  getFooterHeight = () => 0,
  onResize,
}) => {
  const { height, width } = useWindowSize()

  const [dimensions, setDimensions] = useState<T.DimensionsType>({
    width: width ?? 0,
    height: height ?? 0,
  })

  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const { clientWidth, clientHeight } = rootRef.current
    if (onResize) onResize(clientHeight, clientWidth)
    if (clientWidth && clientHeight)
      setDimensions({ width: clientWidth, height: clientHeight })
  }, [height, width, rootRef, isLoading])

  return (
    <Styled.Root ref={rootRef} $cssOverwrite={rootOverwriteCSS}>
      <Styled.TableContainer $cssOverwrite={tableOverwriteCSS}>
        {isLoading ? (
          <Styled.Loader>
            <CircularProgress />
          </Styled.Loader>
        ) : (
          <Table
            stopScrollPropagation
            bufferRowCount={0}
            footerHeight={getFooterHeight(dimensions.height, rowHeight)}
            headerHeight={headerHeight}
            height={dimensions.height}
            rowHeight={rowHeight}
            rowsCount={rowsCount}
            scrollLeft={scrollToColumn}
            showScrollbarX={showScrollbarX}
            width={maxWidth ?? dimensions.width - 27}>
            {children}
          </Table>
        )}
      </Styled.TableContainer>
    </Styled.Root>
  )
}
