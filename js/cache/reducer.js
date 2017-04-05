import { fromJS } from 'immutable'

import {

} from './action'

const initialState = fromJS({
})

export default cache = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action
  switch (type) {
    default:
      return state
  }
}