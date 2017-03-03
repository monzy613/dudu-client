import { fromJS } from 'immutable'

import { OBTAIN_USER_INFO } from './action'
const initialState = fromJS({})  // token, user

export default auth = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case OBTAIN_USER_INFO: {
      const { user, token } = payload
      return state
      .set('token', token)
      .set('user', user)
    }
    default:
      return state
  }
}