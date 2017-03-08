/**
 * @providesModule DDButton
 */

import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { mainBlue } from 'DDColor'

export default class DDButton extends Component {
  render = () => {
    const {
      style,
      titleStyle,
      title,
      onPress,
      ...props,
    } = this.props
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        {...props}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBlue,
    borderRadius: 2,
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
})
