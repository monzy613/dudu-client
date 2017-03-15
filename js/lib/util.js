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

/**
 * 
 * @param {*cssObject} object 
 */
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

const onScrollInjectScript = `(function () {
  if (WebViewBridge) {
    const scrollX = (this.x || window.pageXOffset) - window.pageXOffset
    const scrollY = (this.y || window.pageYOffset) - window.pageYOffset
    this.x = window.pageXOffset
    this.y = window.pageYOffset
    WebViewBridge.send(JSON.stringify({
      type: 'onScroll',
      payload: {
        scrollX,
        scrollY
      }
    }))
  }
})()`

const onClickInjectScript = `(function () {
  if (WebViewBridge) {
    WebViewBridge.send(JSON.stringify({ type: 'onClick' }))
  }
})()`

const htmlStyleInjector = ({ html, styles }) => {
  if (typeof html !== typeof '') {
    return undefined
  }
  return `<body onscroll="${onScrollInjectScript}">
            <div onclick="${onClickInjectScript}">
              ${html}
            <div>
            <style type='text/css'>${cssStringFromObject(styles)}</style>
          </body>`
}

export {
  isMobileLegal,
  htmlStyleInjector,
  cssStringFromObject,
}
