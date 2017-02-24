import { fromJS } from 'immutable'

import {
  SETTING_TEST
} from './action'

const initialState = fromJS({})

export default setting = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_TEST:
      return state.set('userid', 123)
    default:
      return state
  }
}