import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'

import { buttonBackground } from 'DDImages'
import {
  shadowColor,
  transparent,
} from 'DDColor'

class RSSAddButton extends Component {
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
      style = {},
      onPress,
    } = this.props

    const {
      width,
      height,
    } = this.state
    return (
      <Animatable.View
        onLayout={this.measureView}
        style={[styles.contentContainer, style]}
        animation="fadeIn"
        duration={800}
      >
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image style={[styles.backgroundImage, { width, height }]} source={buttonBackground}>
            <Icon style={styles.addIcon} name="ios-add-circle" color="white" size={width/4} />
          </Image>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  button: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    backgroundColor: transparent,
  },
})

export default RSSAddButton
