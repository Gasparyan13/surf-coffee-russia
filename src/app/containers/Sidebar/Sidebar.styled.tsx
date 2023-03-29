import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { HEIGHT_ITEM } from './constants/styled'

export const gridLayoutChildCSS = css`
  && {
    height: ${HEIGHT_ITEM};
    width: 100%;
    &:hover {
      background-color: ${theme.colors.grey};
      transition: 0.1s ease-in-out;
    }
    cursor: pointer;
    border-radius: 0px 16px 16px 0px;
  }
`

export const gridSideBarChildCSS = css`
  && {
    height: ${HEIGHT_ITEM};
    width: 100%;
    &:hover {
      background-color: ${theme.colors.grey};
      transition: 0.1s ease-in-out;
    }
    cursor: pointer;
    border-radius: 0px 16px 16px 0px;
  }
`

export const gridActiveChildCSS = css`
  && {
    height: ${HEIGHT_ITEM};
    background-color: ${theme.colors.grey};
    cursor: pointer;
    border-radius: 0 16px 16px 0;
    color: ${theme.colors.black};
  }
`

export const gridCreateChildCSS = css`
  && {
    height: ${HEIGHT_ITEM};
    &:hover {
      background-color: ${theme.colors.grey};
      transition: 0.1s ease-in-out;
    }
    cursor: pointer;
  }
`

export const iconHeightCSS = css`
  && {
    height: 24px;
  }
`

export const gridLayoutChildTextCSS = css`
  && {
    color: ${theme.colors.wetAsphalt};
  }
`

export const gridLogoCSS = css`
  && {
    width: 225px;
    height: 65px;
    text-align: center;
    margin: 3px 0px 4px 9px;
  }
`

export const gridSkeletonCSS = css`
  && {
    width: 32px;
    height: 218px;
  }
`

export const gridSkeletonsCSS = css`
  && {
    width: 138px;
    height: 218px;
    position: absolute;
    top: 0;
    left: 42px;
  }
`

export const gridSkeletonBottomCSS = css`
  && {
    width: 32px;
    height: 130px;
  }
`

export const gridSkeletonsBottomCSS = css`
  && {
    width: 138px;
    height: 130px;
  }
`

export const skeletonsCSS = css`
  && {
    border-radius: 8px;
    background: #f5f5f5;
  }
`

export const firstSkeletonsCSS = css`
  && {
    border-radius: 8px;
    background: ${theme.colors.grey};
  }
`

const FirstSkeleton = styled.div`
  width: 180px;
  height: 48px;
  background: ${theme.colors.grey};
`

const SkeletonsBox = styled.div`
  position: absolute;
  width: 180px;
  height: 218px;
  top: 153px;
  left: 40px;
`

const SkeletonsBoxBottom = styled.div`
  position: absolute;
  width: 180px;
  height: 130px;
  bottom: 40px;
  left: 40px;
`

const MiniSkeletons = styled.div`
  width: 132px;
  height: 218px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Root = styled.div`
  height: 100vh;
  position: relative;
  padding: 24px 0 32px 0;
`

const Overview = styled.div`
  width: 48px;
  height: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: ${theme.colors.asphalt};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.blackDark};
  }
`

const WelcomePageRightBox = styled.div`
  padding: 40px 0 0 20px;
  position: relative;
  width: 1200px;
  height: 960px;
`

export const Styled = {
  Root,
  WelcomePageRightBox,
  FirstSkeleton,
  SkeletonsBox,
  MiniSkeletons,
  SkeletonsBoxBottom,
  Overview,
}
