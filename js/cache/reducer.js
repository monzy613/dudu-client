import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'

import {
  CACHE_RSS_FEED,
  CACHE_RSS_ITEM,
} from './action'

const initialState = fromJS({
  feeds: {},
  items: {},
})

export default cache = (state = initialState, action) => {
  const {
    type,
    payload = {},
  } = action
  switch (type) {
    case CACHE_RSS_FEED:
      return state.update('feeds', feeds => feeds.merge(payload))
    case CACHE_RSS_ITEM:
      return state.update('items', items => items.merge(payload))
    default:
      return state
  }
}