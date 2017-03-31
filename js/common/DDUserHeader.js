/**
 * @providesModule DDUserHeader
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  backgroundColor,
  darkText,
  lightGray,
} from 'DDColor'

class DDUserHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
    }
  }

  measureView = event => {
    event.nativeEvent.layout.width
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }


  render = () => {
    const {
      user = {},
      onPress,
      showBackground,
    } = this.props

    const {
      avatar,
      motto,
    } = user

    const AccessoryIcon = (
      <Icon style={[styles.accessoryIcon, {
        top: (this.state.height / 2) - 7.5
      }]} name="angle-right" size={15} color={lightGray} />
    )

    if (!showBackground) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, { backgroundColor: 'white' }]}
          onLayout={this.measureView}
        >
          { AccessoryIcon }
          <Image style={styles.image} source={{ uri: avatar }} />
          <Text style={styles.darkMotto}>{motto}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <Image source={{ uri: avatar }}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
          onLayout={this.measureView}
        >
          { AccessoryIcon }
          <Image style={styles.image} source={{ uri: avatar }} />
          <Text style={styles.lightMotto}>{motto}</Text>
        </TouchableOpacity>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingBottom: 35,
    alignItems: 'center',
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: 36,
    borderColor: lightGray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  lightMotto: {
    marginTop: 20,
    fontWeight: '100',
    color: 'white',
  },
  darkMotto: {
    marginTop: 20,
    fontWeight: '100',
    color: darkText,
  },
  accessoryIcon: {
    position: 'absolute',
    right: 16,
  },
})

export default connect(
  null, null
)(DDUserHeader)
