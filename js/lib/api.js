/**
 * @providesModule ddapi
 */

import axios from 'axios'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'

const baseURL = 'http://localhost:3000/api/'

const ddapi = {}

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 10000

const request = ({ method = 'get', path, params }) => {
  return new Promise((resolve, reject) => {
    if (!isFunction(axios[method])) {
      reject && reject({ error: `${method} is not a proper method` })
      return
    }
    axios[method](path, params)
      .then(res => {
        const { data: json } = res
        if (isEmpty(json)) {
          reject && reject({ error: 'json empty' })
        } else {
          const {
            success,
            result
          } = json
          if (result === undefined) {
            if (success === true) {
              resolve && resolve({ success })
            } else {
              reject && reject({ error: '操作失败' })
            }
          } else {
            resolve && resolve(result)
          }
        }
      })
      .catch(error => reject && reject({ error: `network error: ${error}` }))
  })
}

ddapi.get = (path, params) => {
  return request({ path, params })
}

ddapi.post = (path, params) => {
  return request({ method: 'post', path, params })
}

ddapi.delete = (path, params) => {
  return request({ method: 'delete', path, params })
}

export default ddapi
