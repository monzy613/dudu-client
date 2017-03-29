import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import {
  push as pushRoute,
} from 'navigationAction'

class UserPage extends Component {
  render = () => {
    return (
      <View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})

export default connect(
  null,
  { pushRoute }
)(UserPage)
