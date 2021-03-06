/**
 * @providesModule DDDebug
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Egg from 'react-native-egg'
import axios from 'axios'

import {
  showActionSheet,
  showCommentBar,
} from 'modalAction'
import { clearUserInfo } from 'authAction'
import { updateHost } from '../action'
import { clearSet } from 'navigationAction'

class Debug extends Component {
  render = () => {
    const { style = {} } = this.props
    return (
      <Egg style={[{
        height: 50,
        width: 50,
      }, style]}
        setps={'TTTT'}
        onCatch={() => this.showActionSheet()}
      />
    )
  }

  logout = () => {
    this.props.clearUserInfo()
    this.props.clearSet({ key: 'auth' })
  }

  changeToHost = host => {
    this.props.updateHost(host)
    axios.defaults.baseURL = `http://${host}:3000/api/`
    this.logout()
  }

  showActionSheet = () => {
    const { hosts = [] } = this.props
    const actions = [
        {
          title: '自定义',
          handler: () => this.props.showCommentBar({
            placeholder: '请输入host',
            onSend: host => this.changeToHost(host)
          })
        },
        {
          type: 'cancel',
          title: '取消'
        },
        ...hosts.map(host => ({
          title: host,
          handler: () => this.changeToHost(host)
        }))
    ]

    this.props.showActionSheet({
      message: '请选择host',
      actions,
    })
  }
}

export default connect(
  state => {
    const settingState = state.get('setting')
    return {
      hosts: settingState.get('hosts') && settingState.get('hosts').toJS()
    }
  }, {
    updateHost,
    showActionSheet,
    showCommentBar,
    clearUserInfo,
    clearSet,
  }
)(Debug)
