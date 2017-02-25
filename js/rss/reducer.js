import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  UPDATE_RSS_LIST,
  UPDATE_FEEDS,
} from './action'

const initialState = fromJS({
  overviews: {},
  feeds: {},
})

export default rss = (state = initialState, action) => {
  var payload
  switch (action.type) {
    case UPDATE_RSS_LIST:
      payload = action.payload
      return state.update('overviews', map => map.merge(payload))
    case UPDATE_FEEDS:
      payload = action.payload
      return state
      .update('feeds', map => map.merge(payload))
    default:
      return state
  }
}