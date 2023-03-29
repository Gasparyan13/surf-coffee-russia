import { ThemeProvider as StyledThemeProvider } from '@emotion/react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ComponentStory } from '@storybook/react'
import React, { JSXElementConstructor, useEffect, useState } from 'react'

import '../../App.css'
import '../../index.css'
import { theme as oldTheme, theme } from './Mui'
import { theme as newStyledTheme } from './ThemeProvider/theme'
import { getMergedTheme } from './ThemeProvider/utils/getters'

const OLD_THEME_NAME = 'storybook-theme-old'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const makeStoryTemplate =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends JSXElementConstructor<any>>(Component: T): ComponentStory<T> => {
    return (args) => {
      const e = document.querySelectorAll('body')[0]

      const [isOldTheme, setIsOldTheme] = useState(
        e.classList.contains(OLD_THEME_NAME),
      )

      useEffect(() => {
        const observer = new MutationObserver(function (event) {
          setIsOldTheme(
            (event[0].target as HTMLElement)?.classList.value.includes(
              OLD_THEME_NAME,
            ),
          )
        })
        observer.observe(e, {
          attributes: true,
          attributeFilter: ['class'],
          childList: false,
          characterData: false,
        })
      }, [])

      const NewComponent = Component as unknown as React.FC
      return (
        <MuiThemeProvider theme={isOldTheme ? oldTheme : theme}>
          <StyledThemeProvider theme={getMergedTheme(newStyledTheme)}>
            <NewComponent {...args} />
          </StyledThemeProvider>
        </MuiThemeProvider>
      )
    }
  }
