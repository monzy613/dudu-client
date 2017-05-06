/**
 * @providesModule DDSpinner
 */
import React, { Component } from 'react'
import Spinner from 'react-native-spinkit'
import {
  View,
  Dimensions,
} from 'react-native'

export class DDSpinner extends Component {
  render = () => {
    const { color = '#4A90E2' } = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Spinner
          isVisible
          type="9CubeGrid"
          size={Dimensions.get('window').width * 40 / 375}
          color={color}
        />
      </View>
    )
  }
}
