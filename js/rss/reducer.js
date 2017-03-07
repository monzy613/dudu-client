import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  CLEAR_RSS_LIST,
  UPDATE_RSS_LIST,
  UPDATE_FEEDS,
  UPDATE_FEED_READ_STATE,
  UPDATE_FEED_BOOKMARK_STATE,
} from './action'

const initialState = fromJS({
  feeds: {},
})

export default rss = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case CLEAR_RSS_LIST:
      return state.update('feeds', map => fromJS({}))
    case UPDATE_RSS_LIST:
      return state.update('feeds', map => map.merge(payload))
    case UPDATE_FEED_READ_STATE: {
      const { source, id, read } = payload
      return state.setIn(['feeds', source, id, 'read'], read)
    }
    case UPDATE_FEED_BOOKMARK_STATE: {
      const { source, id, bookmark } = payload
      return state.setIn(['feeds', source, id, 'bookmark'], bookmark)
    }
    default:
      return state
  }
}