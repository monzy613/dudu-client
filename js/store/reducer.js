import { fromJS } from 'immutable'

import {
  REHYDRATE_COMPLETE,
} from './action'

const initialState = fromJS({
  rehydrated: false,
  hosts: [
    'localhost',
    '118.190.102.153',
  ],
  host: 'localhost',
})

export default rehydrate = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE_COMPLETE:
      return state.set('rehydrated', true)
    default:
      return state
  }
}
