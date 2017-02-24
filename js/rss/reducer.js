import { fromJS } from 'immutable'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import {
  UPDATE_RSS_LIST,
} from './action'

const initialState = fromJS({ overviews: [] })

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
    default:
      return state
  }
}