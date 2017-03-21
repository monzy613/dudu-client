/**
 * @providesModule ModalContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import DDHud from 'DDHud'
import DDAlertView from 'DDAlertView'

import {
  hideModal,
  TYPE_MODAL_NONE,
  TYPE_MODAL_ALERT,
} from './action'

const Modals = {
  [TYPE_MODAL_HUD]: DDHud,
  [TYPE_MODAL_ALERT]: DDAlertView,
}

const ModalContainer = ({ type, data, hideModal }) => {
  if (type === TYPE_MODAL_NONE) {
    return null
  }

  const Modal = Modals[type]

  if (isEmpty(Modal)) {
    retunr null
  }
  return <Modal hide={hideModal} data={data} />
}

export default connect(
  state => {
    const { modal } = state
    return {
      type: modal.get('modalType'),
      data: modal.get('modalData'),
    }
  }
)
