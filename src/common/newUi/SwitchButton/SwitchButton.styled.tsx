import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled'
import { styled as muiStyled } from '@mui/system'

const blue = {
  500: '#000000',
}

const grey = {
  400: '#C4C4C4',
  500: '#C4C4C4',
  600: '#C4C4C4',
}

export const SwitchRoot = muiStyled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 24px;
  height: 12px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 8px;
    height: 7px;
    top: 2.5px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    -webkit-transition: all 200ms ease;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 14px;
      top: 2.5px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
)
