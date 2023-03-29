import { createTheme as createMUITheme } from '@mui/material/styles'

import { theme as styledTheme } from '../ThemeProvider/theme'
import Bold from './fonts/FiraSans-Bold.ttf'
import Medium from './fonts/FiraSans-Medium.ttf'
import Regular from './fonts/FiraSans-Regular.ttf'

export const theme = createMUITheme({
  typography: {
    fontFamily: 'Fira Sans, sans-serif',
    button: {
      fontWeight: 'normal',
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      light: styledTheme.colors.grey,
      main: styledTheme.colors.black,
      dark: styledTheme.colors.black,
    },
    secondary: {
      light: styledTheme.colors.asphaltSuperLight,
      main: styledTheme.colors.asphalt,
      dark: styledTheme.colors.black,
    },
    error: {
      main: styledTheme.colors.critical,
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 6px 19px rgba(44, 44, 44, 0.1)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['Fira Sans', 'sans-serif'].join(','),
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Fira Sans'), local('FiraSans-Regular'), url(${Regular}) format('ttf');
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Fira Sans'), local('FiraSans-Regular'), url(${Medium}) format('ttf');
        }
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Fira Sans'), local('FiraSans-Bold'), url(${Bold}) format('ttf');
        }      
        font-family: 'Fira Sans';
      `,
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          '& .Mui-disabled': {
            backgroundColor: styledTheme.colors.grey,
            borderRadius: '16px',
            border: 'none',
          },
          height: 48,
        },
        notchedOutline: {
          borderColor: `${styledTheme.colors.asphaltSuperLight}`,
        },
        input: {
          height: 24,
          padding: '12px 16px',
          color: styledTheme.colors.black,
          '&::placeholder': {
            color: styledTheme.colors.pencil,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '0.02em',
            opacity: '1',
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: styledTheme.colors.white,
          borderRadius: '16px',
          '& .Mui-disabled': {
            backgroundColor: styledTheme.colors.grey,
            borderRadius: '16px',
            border: 'none',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '24px',
          boxShadow:
            ' 0px 4px 16px rgba(44, 44, 44, 0.12), 0px 1px 40px rgba(44, 44, 44, 0.12);',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { padding: 0 },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: '6px',
          marginRight: '6px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: 16,
        },
        outlined: {
          height: '-webkit-fill-available',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '5.55px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 8,
          color: styledTheme.colors.critical,
          marginLeft: 0,
          fontSize: '13px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          '&.Mui-expanded': {
            minHeight: '46px',
            maxHeight: '46px',
          },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 16px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          position: 'inherit',
          '&.Mui-expanded': {
            background: 'rgba(196, 199, 208, 0.2)',
            borderRadius: 0,
            margin: 0,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Fira Sans',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: 'Fira Sans',
          fontSize: '14px',
          fontWeight: 'bold',
          height: '48px',
          letterSpacing: '0.02em',
          color: styledTheme.colors.black,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          ':disabled': {
            fontFamily: 'Fira Sans',
            fontSize: '14px',
            backgroundColor: styledTheme.colors.grey,
            borderRadius: '16px',
            border: 'none',
            color: styledTheme.colors.pencil,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 16,
          boxShadow: 'none',
          ':disabled': {
            fontFamily: 'Fira Sans',
            fontSize: '14px',
            backgroundColor: styledTheme.colors.grey,
            borderRadius: '16px',
            border: 'none',
            color: styledTheme.colors.pencil,
          },
          ':hover': {
            boxShadow: 'none',
          },
          ':active': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: styledTheme.colors.black,
          color: styledTheme.colors.white,
          '&:hover': {
            backgroundColor: styledTheme.colors.asphalt,
            color: styledTheme.colors.white,
          },
          '&:active': {
            backgroundColor: styledTheme.colors.wetAsphalt,
            color: styledTheme.colors.white,
          },
        },
        containedSecondary: {
          backgroundColor: styledTheme.colors.grey,
          border: `1px solid ${styledTheme.colors.asphaltSuperLight}`,
          color: styledTheme.colors.black,
          '&:hover': {
            backgroundColor: styledTheme.colors.asphalt,
            color: styledTheme.colors.white,
          },
          '&:active': {
            backgroundColor: styledTheme.colors.wetAsphalt,
            color: styledTheme.colors.white,
          },
        },
      },
    },
  },
})
