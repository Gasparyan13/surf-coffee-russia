import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

export const gridLayoutCSS = css`
  && {
    width: inherit;
    height: 1600px !important;
  }
`

export const eventTitleCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  width: 100%;
  height: 24px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  line-height: 24px;
  margin-top: 10px;
  letter-spacing: 0.02em;
  color: ${theme.colors.asphalt};
`

export const eventTimeCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 8px;
  width: 116px;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: ${theme.colors.black};
`

export const eventMiniTitleCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  width: 65px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 13px;
  line-height: 4px;
  padding-top: 3px;
  letter-spacing: 0.02em;
  color: ${theme.colors.asphalt};
`
export const eventMiniBoxCSS = css`
  padding-top: 4px;
`

export const eventMiniHoursCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 10px;
  margin-left: 30px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${theme.colors.wetAsphalt};
`

export const eventMiddleTitleCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  min-width: 65px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  height: 24px;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 13px;
  line-height: 12px;
  padding-top: 3px;
  letter-spacing: 0.02em;
  color: ${theme.colors.asphalt};
`

export const titleStyleCSS = css`
  && {
    font-family: Fira Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.asphalt};
  }
`

export const titleShiftCSS = css`
  && {
    font-family: Fira Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.black};
  }
`

export const timePickerCSS = css`
  && {
    font-family: Fira Sans;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.black};
  }
`
export const timePickerTwoCSS = css`
  && {
    width: 57px;
  }
`

export const eventMiddleHoursCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-left: 30px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${theme.colors.wetAsphalt};
`

export const eventMiddleTimeCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  margin-left: 2px;
  letter-spacing: 0.02em;
  color: ${theme.colors.black};
`

export const eventHoursCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  margin-top: 8px;
  color: ${theme.colors.wetAsphalt};
`

export const eventMiniTimeCSS = css`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.02em;
  color: ${theme.colors.black};
`
export const eventMiniShiftCSS = css`
  padding-top: 5px;
`

const commonItemWidth = css`
  width: 264px;
`

const Root = styled.div`
  ${commonItemWidth}
  height: inherit;
  position: relative;
  .react-grid-item.react-grid-placeholder {
    background-color: transparent;
  }
`

const commonResizeHandlerCSS = css`
  transition: 0.1s ease-in-out;
  background-color: ${theme.colors.asphalt};
  width: 40%;
  height: 2px;
  border-radius: 25px;
  bottom: 5px;
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    margin-top: 4px;
    padding-top: 15px;
    bottom: 3px;
  }
`

const Event = styled.div`
  padding: 0px 0px 0px 10px;
  background-color: ${theme.colors.grey};
  height: inherit;
  width: inherit;
  z-index: 11;
  border-radius: 16px;
  & > div {
    padding: 2px 0 2px 3px;
  }
  && {
    &:hover {
      .react-resizable-handle {
        &-n {
          top: 0;
          ${commonResizeHandlerCSS}
        }
        &-s {
          bottom: 0;
          ${commonResizeHandlerCSS}
        }
      }
    }
    .react-resizable-handle {
      cursor: ns-resize;
      transform: none;

      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;

      // Hiding default drag-n-drop library arrow

      &::after {
        content: '';
        border-right: none;
        border-bottom: none;
      }

      background-image: none;

      // Hidden cause resize behavior is scales down, not up, how it should be
    }
  }
  cursor: pointer;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`

const Table = styled.table`
  ${commonItemWidth};
  border-spacing: 0 !important;
`

export const Styled = { Root, Event, Background, Table }
