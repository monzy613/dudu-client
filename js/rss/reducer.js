import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  UPDATE_RSS_LIST,
  UPDATE_FEEDS,
} from './action'

const initialState = fromJS({
  rssSources: {},
  // feeds: {},
  feeds: []
})

export default rss = (state = initialState, action) => {
  var payload
  switch (action.type) {
    case UPDATE_RSS_LIST:
      payload = action.payload
      return state.update('rssSources', map => map.merge(payload))
    case UPDATE_FEEDS:
      payload = action.payload
      return state
      // .update('feeds', map => map.merge(payload))
      .update('feeds', list => {
        const newFeeds = []
        const ids = list.map(feed => feed.id)
        const newList = isArray(payload) ? payload : (isEmpty(payload) ? [] : [payload])
        for (i in newList) {
          const feed = newList[i]
          if (!ids.includes(feed.id)) {
            newFeeds.push(feed)
          } else {
            // update
          }
        }
        return list.concat(newFeeds)
      })
    default:
      return state
  }
}