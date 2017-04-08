import { fromJS } from 'immutable'

import {
  SETTING_TEST,
  UPDATE_HOST,
} from './action'

const initialState = fromJS({
  hosts: [
    'localhost',
    '118.190.102.153',
  ],
  host: 'localhost',
})

export default setting = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SETTING_TEST:
      return state.set('userid', 123)
    case UPDATE_HOST:
      return state
      .update('hosts', hosts => {
        if (hosts.includes(payload)) {
          return hosts
        } else {
          return hosts.push(payload)
        }
      })
      .set('host', payload)
    default:
      return state
  }
}