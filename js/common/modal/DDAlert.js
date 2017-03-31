/**
 * @providesModule DDAlert
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

class DDAlert extends Component {
  render = () => {
    return (
      <DDModal
        animationDuration={0}
        isOpen
        noHeader
        position="center"
        style={styles.modal}
      >
        <Text>hahahaha</Text>
      </DDModal>
    )
  }
}

const styles = StyleSheet.create({
})

export default connect(
  null, null
)(DDAlert)
