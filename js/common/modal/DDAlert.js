/**
 * @providesModule DDAlert
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native'
import {
  isEmpty,
  isFunction
} from 'lodash'

import {
  transparent,
  backgroundColor,
  mainBlue,
  darkText,
  lightText,
} from 'DDColor'
import DDModal from 'DDModal'
import { hideModal } from 'modalAction'

const ACTION_TYPE_DEFAULT = 'default'
const ACTION_TYPE_CANCEL = 'cancel'
const ACTION_TYPE_DESTRUCTIVE = 'destructive'

class DDAlert extends Component {
  renderAction = (action, index) => {
    const {
      title,
      type,
      handler,
    } = action
    let additionStyle = {}
    switch (type) {
      case ACTION_TYPE_CANCEL: {
        additionStyle = styles.buttonTitleCancel
        break
      }
      case ACTION_TYPE_DESTRUCTIVE: {
        additionStyle = styles.buttonTitleDestructive
        break
      }
      default:
        break
    }
    return (
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => {
          this.animatableView.fadeOut(100)
          this.modal.closeModal()
          this.endHander = handler
        }}
      >
        <Text style={[styles.buttonTitle, additionStyle]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render = () => {
    const { data = {} } = this.props
    const {
      title = '提示',
      message,
      actions = []
    } = data

    return (
      <DDModal
        swipeToClose={false}
        animationDuration={100}
        isOpen
        noHeader
        position="center"
        onClosed={() => {
          this.props.hideModal()
          if (isFunction(this.endHander)) {
            this.endHander()
          }
        }}
        ref={modal => this.modal = modal}
        style={styles.modal}
      >
        <Animatable.View
          style={styles.container}
          animation="fadeIn"
          ref={animatableView => this.animatableView = animatableView}
        >
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          { isEmpty(message) ? null : <Text style={styles.message}>{message}</Text> }
          <View style={styles.buttonContainer}>
            { actions.map((action, index) => this.renderAction(action, index)) }
          </View>
        </Animatable.View>
      </DDModal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 4,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  title: {
    color: darkText,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  message: {
    lineHeight: 16,
    color: lightText,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  buttonTitle: {
    color: mainBlue,
    textAlign: 'center',
    fontWeight: '100',
  },
  buttonTitleCancel: {
    fontWeight: 'bold',
  },
  buttonTitleDestructive: {
    color: 'red',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor,
    flexDirection: 'row',
  },
})

export default connect(
  state => {
    const data = state.getIn(['modal', 'modalData']) && state.getIn(['modal', 'modalData']).toJS()
    return { data }
  },
  { hideModal }
)(DDAlert)

