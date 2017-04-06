/**
 * @providesModule ddutil
 */

import {
  Platform
} from 'react-native'

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

var sizeof = sizeof || {};
sizeof.sizeof = function(object, pretty) {
    var objectList = [];
    var stack = [object];
    var bytes = 0;

    while (stack.length) {
        var value = stack.pop();

        if(typeof value === 'boolean'){
            bytes += 4;
        }else if(typeof value === 'string'){
            bytes += value.length * 2;
        }else if(typeof value === 'number'){
            bytes += 8;
        }else if(typeof value === 'object' && objectList.indexOf( value ) === -1){
            objectList.push(value);
            // if the object is not an array, add the sizes of the keys
            if (Object.prototype.toString.call(value) != '[object Array]'){
                for(var key in value) bytes += 2 * key.length;
            }
            for(var key in value) stack.push(value[key]);
        }
    }
    return pretty ? sizeof.format(bytes) : bytes;
}
sizeof.format = function(bytes){
    if(bytes < 1024) return bytes + "B";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(0) + "K";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(0) + "M";
    else return(bytes / 1073741824).toFixed(3) + "G";
}

const NAV_BAR_HEIGHT = 44
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
const NavigationBarHeight = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT

export {
  sizeof,
  isMobileLegal,
  htmlStyleInjector,
  cssStringFromObject,
  NavigationBarHeight,
}
