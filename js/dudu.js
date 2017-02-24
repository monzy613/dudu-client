import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import {
  push as pushRoute,
  pop as popRoute
} from 'navigationAction'
import { Container as Navigator } from './navigation'
import {
  backgroundColor,
  transparent
} from 'DDColor'

class Dudu extends Component {
  render = () => (
    <View style={styles.container}>
      <Navigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  }
})

export default connect(
  null,
  {
    pushRoute,
    popRoute,
  }
)(Dudu)
