/**
 * @providesModule DDColor
 */

export const backgroundColor = '#F2F2F2'
export const divider = '#F2F2F2'
export const transparent = 'rgba(0,0,0,0)'
export const mainBlue = '#4A90E2'
export const darkText = '#000000'
export const lightText = '#9B9B9B'
export const placeholderColor = '#D1CECE'
export const shadowColor = '#D6D6D6'
export const disableColor = '#CFD6DD'

// nav, icon, content, text
const readerThemes = [
  // theme1
  [
    '#FCFCFC',
    '#4990E2',
    '#FCFCFC',
    'black',
  ],
  // theme2
  [
    '#F7EFDE',
    '#34AF40',
    '#FAF4E8',
    'black',
  ]
]

// reader theme colors
export const Theme = themeIndex => {
  const [navColor, iconColor, contentColor, textColor] = readerThemes[themeIndex]
  return { navColor, iconColor, contentColor, textColor }
}
