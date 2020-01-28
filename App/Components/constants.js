import {
  space,
  color,
  flexbox,
  grid,
  position,
  variant,
  layout,
  border,
  compose,
  background,
  shadow,
  fontWeight,
  typography,
  display,
  system,
} from 'styled-system'

export const theme = {
  colors: {
    background: '#eff3f6',
    white: '#fff',
    silver: '#cfcfcf',
    dark: '#000000',
    panther: '#161616',
    charcoal: '#595959',
    coal: '#2d2d2d',
    darkBlue: '#12243F',
    primary: '#1D4289',
    lightBlue: '#05A5DE',
  },
  breakpoints: [1280, 1050, 840],
  fonts: ['Poppins'],
  fontSizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 22,
    xlarge: 24,
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  shadows: {
    small: '0 1px 1px  rgba(0,0,0,0.12)',
    medium: '0 1px 5px rgba(0,0,0,0.19)',
    large: '0 1px 15px rgba(0,0,0,0.19)',
    'extra-large': '0 10px 50px rgba(0,0,0, 0.2)',
    formControl: '0px 2px 7px rgba(0,0,0,0.19)',
    formControlFocus: '0px 2px 8px rgba(0,0,0,0.3)',
  },
}

const getValue = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key]

  for (p = 0; p < key.length; p += 1) {
    obj = obj ? obj[key[p]] : undef
  }

  return obj === undef ? def : obj
}

export const get = key => getValue(theme, key, {})

const whiteSpace = system({
  whiteSpace: {
    property: 'whiteSpace',
    cssProperty: 'whiteSpace',
  },
})

export const LAYOUT = layout
export const TYPOGRAPHY = compose(typography, fontWeight, whiteSpace)
export const COMMON = compose(space, color, display, background)
export const BORDER = compose(border, shadow)
export const FLEX = flexbox
export {flexbox, position, variant, grid, system}
