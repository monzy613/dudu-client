/**
 * @providesModule ddutil
 */

import {
  Platform
} from 'react-native'

const QINIU_UPLOAD_HOST = 'http://upload-z2.qiniu.com'
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

const uploadFile = ({ uri, token, key, onprogress }) => {
  const formInput = { key }
  return new Promise((resolve, reject)=> {
    if (typeof uri != 'string' || uri == '' || typeof formInput.key == 'undefined') {
      reject && reject(null);
      return;
    }
    if (uri[0] == '/') {
      uri = "file://" + uri;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', QINIU_UPLOAD_HOST);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject && reject(xhr);
        return;
      }

      resolve && resolve(xhr);
    };

    var formdata = new FormData();
    formdata.append("key", formInput.key);
    formdata.append("token", token);
    if (typeof formInput.type == 'undefined')
      formInput.type = 'application/octet-stream';
    if (typeof formInput.name == 'undefined') {
      var filePath = uri.split("/");
      if (filePath.length > 0)
        formInput.name = filePath[filePath.length - 1];
      else
        formInput.name = "";
    }
    formdata.append("file", {uri: uri, type: formInput.type, name: formInput.name});
    xhr.upload.onprogress = (event) => {
      onprogress && onprogress(event, xhr);
    };
    xhr.send(formdata);
  });
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
  uploadFile,
  isMobileLegal,
  htmlStyleInjector,
  cssStringFromObject,
  NavigationBarHeight,
}
