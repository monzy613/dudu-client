import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { sizeof } from 'ddutil'

import DDDebug from 'DDDebug'
import DDRow from 'DDRow'
import { clearUserInfo } from 'authAction'
import { push as pushRoute, clearSet } from 'navigationAction'
import { showAlert } from 'modalAction'
import { resetAllStates } from 'rootAction'
import {
  backgroundColor
} from 'DDColor'

class Setting extends Component {

  constructor(props) {
    super(props)

    const { user } = props

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    this.state = {
      ds,
      sections: {
        0: [
          {
            type: 'user',
            data: {
              user,
            },
            onPress: this.goToUserSetting
          }
        ],
        1: [
          {
            title: '清除缓存',
            type: 'subtitle',
            data: {
              subtitle: this.props.cacheSize
            },
          },
          {
            title: '允许横屏',
            type: 'switch',
            data: {
              on: true
            },
          },
          {
            title: '关于读读',
            type: 'normal',
          },
        ],
        2: [
          {
            title: '退出',
            type: 'destructive',
            onPress: () =>  this.props.showAlert({
              message: '确认退出吗?',
              actions: [
                {
                  title: '退出',
                  type: 'destructive',
                  handler: this.logout
                },
                {
                  title: '取消',
                  type: 'cancel',
                },
              ]
            })
          },
        ]
      }
    }
  }

  componentWillReceiveProps = props => {
    const { navigator } = props
    if (!isEmpty(navigator)) {
      navigator.setRightItems([
        { content: this.renderDebug() }
      ])
    }
  }

  goToUserSetting = () => this.props.pushRoute({ key: 'user_setting', title: '个人资料' })

  logout = () => {
    this.props.clearUserInfo()
    this.props.clearSet({ key: 'auth' })
  }

  renderRow = row => <DDRow {...row} />

  renderSectionHeader = () => <View style={styles.header} />

  renderDebug = () => <DDDebug />

  render = () => {
    const { ds, sections } = this.state
    const dataSource = ds.cloneWithRowsAndSections(sections)
    return (
      <ListView
        enableEmptySections
        showsVerticalScrollIndicator
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    backgroundColor,
  },
  header: {
    height: 10,
  },
})

export default connect(
  state => {
    const cacheState = state.get('cache')
    const settingState = state.get('setting')
    const size = sizeof.sizeof(cacheState.toJS(), true)
    const mobile = state.getIn(['auth', 'mobile'])
    const user = cacheState.getIn(['users', mobile]) && cacheState.getIn(['users', mobile]).toJS()
    return {
      cacheSize: size,
      hosts: settingState.get('hosts') && settingState.get('hosts').toJS(),
      user,
    }
  },
  {
    pushRoute,
    clearUserInfo,
    clearSet,
    resetAllStates,
    showAlert,
  }
)(Setting)
