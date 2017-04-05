import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'

import rehydrate from './reducer'
import { RESET_ALL_STATES } from 'rootAction'
import { reducer as auth } from '../auth'
import { reducer as navigation } from '../navigation'
import modal from 'ModalReducer'
import { reducer as setting } from '../setting'
import { reducer as rss } from '../rss'
import { reducer as cache } from '../cache'

const appReducer = combineReducers({
  rehydrate,
  auth,
  modal,
  navigation,
  setting,
  rss,
  cache,
})

export default rootReducer = (state, action) => {
  return appReducer(action.type === RESET_ALL_STATES ? fromJS({}) : state, action)
}