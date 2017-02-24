import { combineReducers } from 'redux-immutable'

import { reducer as navigation } from '../navigation'
import { reducer as setting } from '../setting'
import { reducer as rss } from '../rss'

export default combineReducers({
  navigation,
  setting,
  rss,
})
