import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

const commonFontCSS = css`
  font-family: 'Fira Sans';
  text-align: left;
  letter-spacing: 0.02em;
  margin: 0;
  color: ${theme.colors.black};
`

export const SURF_PC_H1 = styled.h1`
  /* SURF/PC/H1 */
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  ${commonFontCSS}
`

export const SURF_PC_H2 = styled.h2`
  /* SURF/PC/H2 */
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  ${commonFontCSS}
`

export const SURF_PC_H3 = styled.h3`
  /* SURF/PC/H3 */
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_PC_H4 = styled.h4`
  /* SURF/PC/H4 */
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_PC_PBody = styled.span`
  /* SURF/PC/P Body */
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_PC_SUBTextLight = styled.span`
  /* SURF/PC/Text Light */
  font-weight: 300;
  font-size: 14px;
  line-height: 32px;
  ${commonFontCSS}
`

export const SURF_PC_Small = styled.div`
  /* SURF/PC/Small */
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  ${commonFontCSS}
`

export const SURF_PC_Button = styled.div`
  /* SURF/PC/Button */
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_PC_Input = styled.span`
  /* SURF/PC/Input */
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_PC_LabelBold = styled.div`
  /* SURF/PC/Label Bold */
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  ${commonFontCSS}
`
export const SURF_MOBILE_H1 = styled.h1`
  /* SURF/MOBILE/H1 */
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  ${commonFontCSS}
`

export const SURF_MOBILE_H2 = styled.h2`
  /* SURF/MOBILE/H2 */
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  ${commonFontCSS}
`

export const SURF_MOBILE_H3 = styled.h3`
  /* SURF/MOBILE/H3 */
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_MOBILE_H4 = styled.h4`
  /* SURF/MOBILE/H4 */
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_MOBILE_PBody = styled.div`
  /* SURF/MOBILE/P Body */
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_MOBILE_SUBTextLight = styled.div`
  /* SURF/MOBILE/Subtext Light */
  font-weight: 300;
  font-size: 14px;
  line-height: 32px;
  ${commonFontCSS}
`

export const SURF_MOBILE_Small = styled.div`
  /* SURF/MOBILE/Small */
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  ${commonFontCSS}
`

export const SURF_MOBILE_LabelBold = styled.div`
  /* SURF/MOBILE/Label Bold */
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  ${commonFontCSS}
`
