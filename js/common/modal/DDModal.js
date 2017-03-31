/**
 * @providesModule DDModal
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/EvilIcons'
import isFunction from 'lodash/isFunction'

export default class DDModal extends Component {
  closeModal = () => this.modal.close()

  render = () => {
    const {
      isOpen,
      children,
      ...restProps,
    } = this.props

    return (
      <Modal
        style={restProps.style}
        isOpen={isOpen}
        ref={modal => this.modal = modal}
        {...restProps}
      >
      {isFunction(children) ? children(this.closeModal) : children}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  }
})