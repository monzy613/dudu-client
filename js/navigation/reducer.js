import { fromJS } from 'immutable'
import { NavigationExperimental } from 'react-native'
import wurl from 'wurl'
import isEmpty from 'lodash/isEmpty'

import {
  ROUTE_PUSH,
  ROUTE_POP,
  ROUTE_CLEAR,
  ROUTE_CLEAR_SET,
} from './action'
import allRoutes from '../routes'

const initialState = fromJS({
  index: 0,
  tab: 0,
  routes: [
    { key: 'home' }
  ],
})

export default navigation = (state = initialState, action) => {
  const currentIndex = state.get('index')
  switch (action.type) {
    case ROUTE_POP: {
      if (currentIndex <= 0) {
        return state
      }
      return state
      .update('index', index => index - 1)
      .update('routes', routes => routes.slice(0, -1))
    }
    case ROUTE_PUSH: {
      const payload = action.payload
      const {
        link,
        key,
      } = payload
      if (isEmpty(link) && isEmpty(key)) {
        console.warn('push route need a link or a key')
        return state
      }
      const scheme = link ? wurl('protocol', link) : null
      if (scheme === 'dudu') {
        payload.key = wurl('hostname', link)
        payload.params = wurl('?', link)
        const title = payload.params && payload.params.title
        if (!isEmpty(title)) {
          payload.title = title
        }
      }

      // TODO: 暂时防止一下重复页面的push
      const routeIndex = state.get('routes').filter(route => {
        return route.get('key').includes(`${key}___`) || route.get('key') === key
      }).size
      console.log(routeIndex)
      if (routeIndex !== 0) {
        const newKey = `${key}___${routeIndex}`
        allRoutes[newKey] = allRoutes[key]
        payload.key = newKey
      }
      payload.routeIndex = routeIndex

      return state
      .update('index', index => index + 1)
      .update('routes', routes => routes.push(fromJS(payload)))
    }
    case ROUTE_CLEAR_SET: {
      return state
      .set('routes', fromJS([action.payload]))
      .set('index', 0)
    }
    default:
      return state
  }
}