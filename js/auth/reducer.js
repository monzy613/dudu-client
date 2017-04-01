import { fromJS } from 'immutable'
import axios from 'axios'

import {
  OBTAIN_USER_INFO,
  CLEAR_USER_INFO
} from './action'
const initialState = fromJS({
  hosts: [
    'localhost',
    '118.190.102.153',
  ],
  host: 'localhost',
})

export default auth = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case OBTAIN_USER_INFO: {
      const { user, token } = payload
      axios.defaults.headers.common['Authorization'] = token
      return state
      .set('token', token)
      .set('user', fromJS(user))
    }
    case CLEAR_USER_INFO: {
      return initialState
    }
    default:
      return state
  }
}