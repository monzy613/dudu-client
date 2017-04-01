/**
 * @providesModule DDHud
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from 'react-native-spinkit'

import DDModal from 'DDModal'
import { hideModal } from 'modalAction'
import {
  transparent,
  lightText,
  mainBlue,
} from 'DDColor'

const HUD_TYPE_SUCCESS = 'success'
const HUD_TYPE_ERROR = 'error'
const HUD_TYPE_LOADING = 'loading'

class DDHud extends Component {

  /**
   * hideDuration 毫秒， 用来控制自动关闭的时间
   */
  componentDidMount = props => {
    const { data = {} } = this.props
    const { autoHide } = data
    setTimeout(() => this.modal.closeModal(), 1500)
  }

  renderTopContent = type => {
    switch (type) {
      case HUD_TYPE_SUCCESS: {
        return (
          <Icon
            name="md-checkmark"
            color={mainBlue}
            size={25}
          />
        )
      }
      case HUD_TYPE_ERROR: {
        return (
          <Icon
            name="ios-bug-outline"
            color="red"
            size={25}
          />
        )
      }
      case HUD_TYPE_LOADING: {
        return (
          <Spinner
            isVisible
            type="CircleFlip"
            size={30}
            color={mainBlue}
          />
        )
      }
      default:
        return null
    }
  }

  render = () => {
    const { data = {} } = this.props
    const {
      type,
      text,
    } = data

    return (
      <DDModal
        swipeToClose={false}
        animationDuration={100}
        isOpen
        noHeader
        position="center"
        style={styles.modal}
        onClosed={this.props.hideModal}
        ref={modal => this.modal = modal}
      >
        <TouchableOpacity
          activeOpacity={1}
          focusOpacity={1}
          style={styles.dismissBackground}
          onPress={type === HUD_TYPE_LOADING ? undefined : () => this.modal.closeModal()}
        >
          <View style={styles.container}>
            { this.renderTopContent(type) }
            { isEmpty(text) ? null : <Text style={styles.text}>{text}</Text> }
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 4,
    padding: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  text: {
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: '100',
    lineHeight: 17,
    color: lightText,
  }
})

export default connect(
  state => {
    const data = state.getIn(['modal', 'modalData']) && state.getIn(['modal', 'modalData']).toJS()
    return { data }
  },
  { hideModal }
)(DDHud)
