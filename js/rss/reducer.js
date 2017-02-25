import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  UPDATE_RSS_LIST,
  UPDATE_FEEDS,
} from './action'

const initialState = fromJS({
  overviews: [],
  feeds: []
})

export default rss = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RSS_LIST:
      const payload = action.payload
      return state
      .update('overviews', list => {
        const newItems = []
        const oldIDs = list.map(overview => overview.id)
        if (isArray(payload)) {
          for (i in payload) {
            const overview = payload[i]
            if (!oldIDs.includes(overview.id)) {
              newItems.push(overview)
            }
          }
        } else if (!isEmpty(payload)){
            if (!oldIDs.includes(payload.id)) {
              newItems.push(overview)
            }
        }
        return list.concat(newItems)
      })
    case UPDATE_FEEDS:
      payload = action.payload
      return state
      .update('feeds', list => {
        const newFeeds = []
        const ids = list.map(feed => feed.id)
        const newList = isArray(payload) ? payload : (isEmpty(payload) ? [] : [payload])
        for (i in newList) {
          const feed = payload[i]
          if (!ids.includes(feed.id)) {
            newFeeds.push(feed)
          }
        }
        return list.concat(newFeeds)
      })
    default:
      return state
  }
}