import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'

import rehydrate from './reducer'
import { RESET_ALL_STATES } from 'rootAction'
import { reducer as auth } from '../auth'
import { reducer as navigation } from '../navigation'
import { reducer as setting } from '../setting'
import { reducer as rss } from '../rss'

const appReducer = combineReducers({
  rehydrate,
  auth,
  navigation,
  setting,
  rss,
})

export default rootReducer = (state, action) => {
  return appReducer(action.type === RESET_ALL_STATES ? fromJS({}) : state, action)
}