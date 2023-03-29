import { css, SerializedStyles } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const redTextCSS = css`
  && {
    color: ${theme.colors.critical};
  }
`
export const whiteTextCSS = css`
  && {
    color: ${theme.colors.grey};
  }
`

export const textDecorationNoneCSS = css`
  && {
    text-decoration: none;
  }
`
export const buttonCenterCSS = css`
  && {
    display: block;
    margin: auto;
  }
`

export const borderRadiusCSS = css`
  && {
    border-radius: 5px;
  }
`

export const width100CSS = css`
  && {
    width: 100%;
  }
`

export const height100CSS = css`
  && {
    height: 100%;
  }
`

export const heightInheritCSS = css`
  && {
    height: inherit;
  }
`

export const transitionCSS = css`
  && {
    transition: 0.25s ease-in-out;
  }
`

export const centerCSS = css`
  && {
    ${height100CSS};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -50px;
  }
`

export const displayBlockCSS = css`
  && {
    display: block;
  }
`

export const marginCenterCSS = css`
  && {
    margin: 0 auto;
  }
`

export const centerTextCSS = css`
  && {
    text-align: center;
  }
`

export const textIndentCSS = css`
  && {
    text-indent: 20px;
  }
`
export const boxShadowCSS = css`
  && {
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.47);
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.47);
  }
`
export const cursorPointerCSS = css`
  && {
    cursor: pointer;
  }
`

export const readOnlyInputCSS = css`
  && {
    > * input {
      caret-color: transparent;

      cursor: default;
    }
  }
`

export const wetAsphaltColorCSS = css`
  && {
    color: ${theme.colors.wetAsphalt};
  }
`

export const commonFontStyleCSS = css`
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
`

export const commonTextCSS = css`
  ${commonFontStyleCSS};
  color: ${theme.colors.black};
  width: max-content;
  margin: 0;
`

export const labelTextCSS = css`
  && {
    .MuiFormControlLabel-label {
      ${commonTextCSS}
    }
  }
`

export const uploadInputCSS = css`
  && {
    caret-color: transparent;
    .MuiOutlinedInput-input {
      cursor: pointer;
    }
    .MuiOutlinedInput-root {
      cursor: pointer;
      fieldset {
        cursor: pointer;
      }
      &:hover fieldset {
        cursor: pointer;
      }
    }
    .Mui-disabled {
      cursor: default;
      .MuiInputAdornment-root {
        color: ${theme.colors.pencil};
      }
      fieldset {
        cursor: default;
      }
      &:hover fieldset {
        cursor: default;
      }
    }
  }
`

export const makeWidthCSS = (width: number) => css`
  && {
    width: ${width}px;
  }
`
export const makeBlurFooterCSS = (height = 96) => css`
  && {
    z-index: 98;
    height: ${height}px;
    background: ${theme.colors.gradientWhite};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &::before {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
      width: 10px;
      height: ${height}px;
      background-color: ${theme.colors.white};
    }
  }
`

export const makeTruncatedTextDots = css`
  && {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const changeSVGHoverColor = css`
  && {
    &:hover {
      * {
        fill: ${theme.colors.white};
      }
    }
    &:active {
      * {
        fill: ${theme.colors.white};
      }
    }
  }
`

export const mt = (value: number): SerializedStyles => css`
  && {
    margin-top: ${value}px;
  }
`
export const mb = (value: number): SerializedStyles => css`
  && {
    margin-bottom: ${value}px;
  }
`
export const ml = (value: number): SerializedStyles => css`
  && {
    margin-left: ${value}px;
  }
`
export const mr = (value: number): SerializedStyles => css`
  && {
    margin-right: ${value}px;
  }
`
export const pt = (value: number): SerializedStyles => css`
  && {
    padding-top: ${value}px;
  }
`
export const p = (value: number): SerializedStyles => css`
  && {
    padding: ${value}px;
  }
`
export const pb = (value: number): SerializedStyles => css`
  && {
    padding-bottom: ${value}px;
  }
`
export const pl = (value: number): SerializedStyles => css`
  && {
    padding-left: ${value}px;
  }
`
export const pr = (value: number): SerializedStyles => css`
  && {
    padding-right: ${value}px;
  }
`

export const makeDivBlurred = (interpolation: number): SerializedStyles => css`
  && {
    -webkit-filter: blur(${interpolation}px);
    -moz-filter: blur(${interpolation}px);
    -o-filter: blur(${interpolation}px);
    -ms-filter: blur(${interpolation}px);
    filter: blur(${interpolation}px);
  }
`
