import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { settingTest } from './action'
import { clearUserInfo } from 'authAction'
import { push as pushRoute, clearSet } from 'navigationAction'
import DDNavigationLayout from 'DDNavigationLayout'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = { hidden: false }
  }

  clear = () => {
    this.props.clearUserInfo()
    this.props.clearSet({ key: 'auth' })
  }

  render = () => {
    return (
      <DDNavigationLayout isRoot title="设置">
        <View style={styles.container}>
          <TouchableOpacity onPress={this.clear}>
            <Text>clear</Text>
          </TouchableOpacity>
        </View>
      </DDNavigationLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(
  null,
  {
    pushRoute,
    settingTest,
    clearUserInfo,
    clearSet,
  }
)(Setting)