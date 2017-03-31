/**
 * @providesModule ModalReducer
 */

import { fromJS } from 'immutable'
import {
  TYPE_MODAL_NONE,
  SHOW_MODAL,
} from './action'

const initialState = fromJS({
  modalType: TYPE_MODAL_NONE,
  modalData: {},
})

export default modal = (state = initialState, action) => {
  if (action.type === SHOW_MODAL) {
    return state.withMutations(map => {
      map.set('modalType', action.modalType)
      .set('modalData', action.modalData)
    })
  }

  return state
}
