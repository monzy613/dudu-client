/**
 * @providesModule DDReferredSource
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  backgroundColor,
  darkText,
  lightText,
} from 'DDColor'

export default class DDReferredSource extends Component {
  render = () => {
    const {
      feed = {},
      onPress,
      style = {},
    } = this.props
    const {
      title,
      source,
    } = feed
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={1}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.source} numberOfLines={1}>{source}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: backgroundColor,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    color: darkText,
    fontSize: 16,
    fontWeight: '100',
  },
  source: {
    color: lightText,
    fontWeight: '100',
    marginTop: 5,
  },
})
