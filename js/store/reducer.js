import { fromJS } from 'immutable'

import {
  REHYDRATE_COMPLETE,
} from './action'

const initialState = fromJS({
  rehydrated: false,
})

export default rehydrate = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE_COMPLETE:
      return state.set('rehydrated', true)
    default:
      return state
  }
}
