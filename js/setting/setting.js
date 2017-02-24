import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { settingTest } from './action'
import { push as pushRoute } from 'navigationAction'
import DDNavigationLayout from 'DDNavigationLayout'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = { hidden: false }
  }

  push = () => {
    // this.props.pushRoute({ link: 'dudu://rss_source?title=订阅源' })
    this.props.settingTest()
  }

  render = () => {
    return (
      <DDNavigationLayout isRoot title="设置">
        <View style={styles.container}>
          <TouchableOpacity onPress={this.push}>
            <Text>push</Text>
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
  { pushRoute, settingTest }
)(Setting)