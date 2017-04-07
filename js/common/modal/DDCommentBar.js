/**
 * @providesModule DDCommentBar
 */

import React, { Component } from 'react'
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import isFunction from 'lodash/isFunction'

import { hideModal } from 'modalAction'
import DDModal from 'DDModal'
import DDButton from 'DDButton'
import {
  transparent,
  darkText,
  lightGray,
  mainBlue,
} from 'DDColor'

class DDCommentBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendTapped: false,
      content: '',
      marginBottom: 0,
    }
  }

  componentWillMount = () => {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
  }

  componentWillUnmount = () => {
    this.keyboardWillShowListener.remove()
  }

  keyboardWillShow = event => {
    const { endCoordinates = {} } = event
    const { height: marginBottom } = endCoordinates
    this.setState({ marginBottom })
  }

  onClosed = () => {
    const { sendTapped, content } = this.state
    this.props.hideModal()
    if (sendTapped) {
      const { data = {} } = this.props
      const { onSend } = data
      if (isFunction(onSend)) {
        onSend(content)
      }
    }
  }

  onSend = () => {
    this.setState({ sendTapped: true })
    this.modal.closeModal()
  }

  render = () => {
    const { marginBottom } = this.state
    const { data = {} } = this.props
    const { placeholder } = data

    return (
      <DDModal
        swipeToClose={false}
        animationDuration={250}
        noHeader
        isOpen
        position="bottom"
        backdropOpacity={0.3}
        style={styles.modal}
        onClosed={this.onClosed}
        ref={modal => this.modal = modal}
      >
        <TouchableOpacity
          activeOpacity={1}
          focusOpacity={1}
          style={styles.dismissBackground}
          onPress={() => this.modal.closeModal()}
        >
          <View style={[styles.container, { marginBottom }]}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              multiline={true}
              placeholder={placeholder}
              onChangeText={content => this.setState({ content })}
              underlineColorAndroid={transparent}
            />
            <TouchableOpacity style={styles.sendButton} onPress={this.onSend}>
              <Text style={styles.sendButtonTitle}>发送</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </DDModal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: transparent,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dismissBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: darkText,
    marginRight: 8,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: mainBlue,
  },
  sendButtonTitle: {
    color: 'white',
    fontWeight: '100',
  }
})

export default connect(
  state => {
    const data = state.getIn(['modal', 'modalData']) && state.getIn(['modal', 'modalData']).toJS()
    return { data }
  },
  { hideModal }
)(DDCommentBar)