import { fromJS } from 'immutable'
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
    case ROUTE_POP:
      if (currentIndex <= 0) {
        return state
      }
      return state
      .update('index', index => index - 1)
      .update('routes', routes => routes.slice(0, -1))
    case ROUTE_PUSH:
      const payload = action.payload
      const link = payload.link
      const scheme = link ? wurl('protocol', link) : null
      if (scheme === 'dudu') {
        payload.key = wurl('hostname', link)
        payload.params = wurl('?', link)
        const title = payload.params && payload.params.title
        if (!isEmpty(title)) {
          payload.title = title
        }
      }
      return state
      .update('index', index => index + 1)
      .update('routes', routes => routes.push(fromJS(payload)))
    default:
      return state
  }
}