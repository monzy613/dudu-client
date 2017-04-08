/**
 * @providesModule ModalContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import DDHud from 'DDHud'
import DDAlert from 'DDAlert'
import DDActionSheet from 'DDActionSheet'
import DDCommentBar from 'DDCommentBar'

import {
  hideModal,
  TYPE_MODAL_HUD,
  TYPE_MODAL_NONE,
  TYPE_MODAL_ALERT,
  TYPE_MODAL_COMMENT_BAR,
  TYPE_MODAL_ACTION_SHEET,
} from './action'

const Modals = {
  [TYPE_MODAL_HUD]: DDHud,
  [TYPE_MODAL_ALERT]: DDAlert,
  [TYPE_MODAL_COMMENT_BAR]: DDCommentBar,
  [TYPE_MODAL_ACTION_SHEET]: DDActionSheet,
}

const ModalContainer = ({ type, data, hideModal }) => {
  if (type === TYPE_MODAL_NONE) {
    return null
  }
  const Modal = Modals[type]
  return isEmpty(Modal) ? null : <Modal hide={hideModal} data={data} />
}

export default connect(
  state => {
    const modalState = state.get('modal')
    return {
      type: modalState.get('modalType'),
      data: modalState.get('modalData'),
    }
  }
)(ModalContainer)
