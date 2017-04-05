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
import Egg from 'react-native-egg'

import DDRow from 'DDRow'
import { clearUserInfo } from 'authAction'
import { push as pushRoute, clearSet } from 'navigationAction'
import {
  showAlert
} from 'modalAction'
import { resetAllStates } from 'rootAction'
import {
  backgroundColor
} from 'DDColor'

class Setting extends Component {

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    this.state = {
      ds,
      sections: {
        // section 0
        0: [
          {
            title: '清除缓存',
            type: 'subtitle',
            data: {
              subtitle: '100MB'
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
        // section 1
        1: [
          {
            title: '退出',
            type: 'destructive',
            onPress: () =>  this.props.showAlert({
              // message: '确认退出吗?',
              actions: [
                {
                  title: '退出',
                  type: 'destructive',
                  handler: () => {
                    this.props.clearUserInfo()
                    this.props.clearSet({ key: 'auth' })
                  }
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
        { content: this.renderEgg() }
      ])
    }
  }

  renderRow = row => <DDRow {...row} />

  renderSectionHeader = () => <View style={styles.header} />

  renderEgg = () => (
    <Egg style={styles.egg}
      setps={'TTTTTTT'}
      onCatch={() => this.props.resetAllStates()}
    />
  )

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
  egg: {
    height: 50,
    width: 50,
  },
})

export default connect(
  null,
  {
    pushRoute,
    clearUserInfo,
    clearSet,
    resetAllStates,
    showAlert,
  }
)(Setting)