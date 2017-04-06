import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  CLEAR_RSS_LIST,
  UPDATE_FEEDS,
  UPDATE_SUBSCRIBE_LIST,
  UNSUBSCRIBE,
  UPDATE_FEED_READ_STATE,
  UPDATE_FEED_BOOKMARK_STATE,
  UPDATE_READER_THEME,
} from './action'

const initialState = fromJS({
  theme: 0,
  subscribes: []
})

export default rss = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case CLEAR_RSS_LIST:
      return state.update('feeds', map => fromJS({}))
    case UPDATE_SUBSCRIBE_LIST:
      return state.set('subscribes', Object.keys(payload))
    case UNSUBSCRIBE: {
      return state.update('subscribes', subscribes => subscribes.filter(subscribe => subscribe !== payload))
    }
    case UPDATE_FEED_READ_STATE: {
      const { source, id, read } = payload
      return state.setIn(['feeds', source, id, 'read'], read)
    }
    case UPDATE_FEED_BOOKMARK_STATE: {
      const { source, id, bookmark } = payload
      return state.setIn(['feeds', source, id, 'bookmark'], bookmark)
    }
    case UPDATE_READER_THEME: {
      const { theme } = payload
      return state.set('theme', theme)
    }
    default:
      return state
  }
}