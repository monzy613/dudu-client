/**
 * @providesModule DDDebug
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native'

import DDModal from 'DDModal'
import { hideModal } from 'modalAction'

class DDDebug extends Component {
  render = () => {
    return (
      <DDModal
        animationDuration={100}
        isOpen
        noHeader
        position="center"
        onClosed={this.props.hideModal}
        style={styles.modal}
      >
      </DDModal>
    )
  }
}

const styles = StyleSheet.create({
})

export default connect(
  null,
  { hideModal }
)(DDDebug)
