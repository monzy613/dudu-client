/**
 * @providesModule ddutil
 */

/**
 * 判断手机号是否合理
 */
const isMobileLegal = number => {
  const re = /^(1(3|4|5|7|8))\d{9}$/
  return re.test(number)
}

const cssStringFromObject = object => {
  let result = ''
  for (tag in object) {
    let tempContent = ''
    const tagStyle = object[tag]
    for (styleKey in tagStyle) {
      const styleValue = tagStyle[styleKey]
      tempContent += `${styleKey}:${styleValue};`
    }
    result += `${tag}{${tempContent}}`
  }
  return result
}

const htmlStyleInjector = ({ html, styles }) => {
  if (typeof html !== typeof '') {
    return undefined
  }
  return `<body>${html}<style type='text/css'>${cssStringFromObject(styles)}</style></body>`
}

export {
  isMobileLegal,
  htmlStyleInjector,
  cssStringFromObject,
}
