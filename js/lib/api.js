/**
 * @providesModule ddapi
 */

import axios from 'axios'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'

const baseURL = 'http://10.12.140.75:3000/'

const instance = axios.create({
  baseURL,
  timeout: 1000,
})
const ddapi = {}

const apiRequest = ({ method = 'get', path, params }) => {
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
          if (json.success) {
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
  return apiRequest({ path, params })
}

ddapi.post = (path, params) => {
  return apiRequest({ method: 'post', path, params })
}

export default ddapi
