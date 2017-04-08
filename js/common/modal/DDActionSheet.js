/**
 * @providesModule DDActionSheet
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {
  isEmpty,
  isFunction,
} from 'lodash'

import {
  transparent,
  mainBlue,
  divider,
  backgroundColor,
  lightText,
  darkText,
} from 'DDColor'
import DDModal from 'DDModal'
import { hideModal } from 'modalAction'

const ACTION_TYPE_DEFAULT = 'default'
const ACTION_TYPE_CANCEL = 'cancel'
const ACTION_TYPE_DESTRUCTIVE = 'destructive'

class DDActionSheet extends Component {

  renderAction = (action = {}, index) => {
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
        style={styles.actionItem}
        key={index}
        onPress={() => {
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
      message,
      actions = [],
    } = data

    const normalActions = actions.filter(action => action.type !== ACTION_TYPE_CANCEL)
    const cancelActions = actions.filter(action => action.type === ACTION_TYPE_CANCEL)

    return (
      <DDModal
        swipeToClose={false}
        animationDuration={300}
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
        <TouchableOpacity
          activeOpacity={1}
          focusOpacity={1}
          style={styles.dismissBackground}
          onPress={() => this.modal.closeModal()}
        >
          <View style={styles.actionContainer}>
            { isEmpty(message) ? null : (
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
              </View>
            ) }
            { normalActions.map((action, index) => this.renderAction(action, index)) }
          </View>
          <View style={styles.actionContainer}>
            { cancelActions.map((action, index) => this.renderAction(action, index)) }
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
    alignItems: 'center',
  },
  dismissBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: divider,
  },
  message: {
    color: lightText,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
  },
  actionItem: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  actionContainer: {
    borderRadius: 6,
    backgroundColor,
    overflow: 'hidden',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonTitle: {
    color: mainBlue,
    textAlign: 'center',
  },
  buttonTitleCancel: {
    fontWeight: 'bold',
  },
  buttonTitleDestructive: {
    color: 'red',
  },
})

export default connect(
  state => {
    const data = state.getIn(['modal', 'modalData']) && state.getIn(['modal', 'modalData']).toJS()
    return { data }
  },
  { hideModal }
)(DDActionSheet)

