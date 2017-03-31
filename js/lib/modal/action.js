/**
 * @providesModule modalAction
 */

import { fromJS } from 'immutable'

export const SHOW_MODAL = 'SHOW_MODAL'
export const showModal = (modalType, data = {}) => ({
  type: SHOW_MODAL,
  modalType,
  modalData: fromJS(data)
})

const baseShowModal = (type, data) => showModal(type, data)

export const TYPE_MODAL_NONE = 'TYPE_MODAL_NONE'
export const hideModal = baseShowModal.bind(this, TYPE_MODAL_NONE)

export const TYPE_MODAL_HUD = 'TYPE_MODAL_HUD'
export const showHud = baseShowModal.bind(this, TYPE_MODAL_HUD)

export const TYPE_MODAL_ALERT = 'TYPE_MODAL_ALERT'
export const showAlert = baseShowModal.bind(this, TYPE_MODAL_ALERT)

export const TYPE_MODAL_GRID_ACTIONS = 'TYPE_MODAL_GRID_ACTIONS'
export const showGridActions = baseShowModal.bind(this, TYPE_MODAL_GRID_ACTIONS)
