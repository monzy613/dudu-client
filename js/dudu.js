import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import ModalContainer from 'ModalContainer'
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
  componentDidMount = () => {
    SplashScreen.hide()
  }

  render = () => {
    const rehydrated = this.props.rehydrated
    return rehydrated ? (
      <View style={styles.container}>
        <Navigator />
        <ModalContainer />
      </View>
    ) : <View style={{ backgroundColor: 'red' }}/> 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  }
})

export default connect(
  state => ({
    rehydrated: state.getIn(['rehydrate', 'rehydrated'])
  }),
  {
    pushRoute,
    popRoute,
  }
)(Dudu)
