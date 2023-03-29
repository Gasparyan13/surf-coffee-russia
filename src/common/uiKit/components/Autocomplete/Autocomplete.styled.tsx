import { css } from '@emotion/react'

export const autocompleteBaseCSS = css`
  .MuiAutocomplete-inputRoot.MuiOutlinedInput-root {
    padding: 0;
    > input {
      padding: 12px 16px;
    }

    .MuiAutocomplete-endAdornment {
      right: 15px;

      button {
        padding: 2px 0;
      }
      button:last-child {
        margin-left: 5px;
      }

      button:hover {
        background-color: transparent;
      }
    }
  }
`
