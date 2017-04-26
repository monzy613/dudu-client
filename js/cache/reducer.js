import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'

import {
  CACHE_RSS_FEED,
  CACHE_RSS_ITEM,
  CACHE_USER,
  CACHE_ITEM_COMMENTS,
  CACHE_ITEM_COMMENT,
} from './action'

const initialState = fromJS({
  feeds: {},
  items: {},
  users: {},
  comments: {},
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
    case CACHE_USER:
      return state.update('users', users => users.merge({ [payload.mobile]: payload }))
    case CACHE_ITEM_COMMENTS:
      return state.update('comments', comments => comments.merge(payload))
    case CACHE_ITEM_COMMENT:
      return state.update('comments', comments => comments.merge(payload))
    default:
      return state
  }
}