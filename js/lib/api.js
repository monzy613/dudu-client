/**
 * @providesModule ddapi
 */

import axios from 'axios'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'

const baseURL = 'http://localhost:3000/'

const instance = axios.create({
  baseURL,
  timeout: 10000,
})
const ddapi = {}

const request = ({ method = 'get', path, params }) => {
  return new Promise((resolve, reject) => {
    if (!isFunction(instance[method])) {
      reject({ error: `${method} is not a proper method` })
      return
    }
    instance[method](path, params)
      .then(res => {
        const { data: json } = res
        if (isEmpty(json)) {
          reject({ error: 'json empty' })
        } else {
          if (json.success || json.result !== undefined) {
            resolve(json.result)
          } else {
            reject({ error: json.error })
          }
        }
      })
      .catch(error => {
        reject({ error })
      })
  })
}

ddapi.get = (path, params) => {
  return request({ path, params })
}

ddapi.post = (path, params) => {
  return request({ method: 'post', path, params })
}

export default ddapi
