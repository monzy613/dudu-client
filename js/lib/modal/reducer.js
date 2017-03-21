/**
 * @providesModule ModalReducer
 */

import { fromJS } from 'immutable'
import {} from './action'

const initialState = fromJS({})

export default modal = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    default:
      return state
  }
}
