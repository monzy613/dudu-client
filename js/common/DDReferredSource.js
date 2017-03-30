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
    } = this.props
    const {
      title,
      source,
    } = feed
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
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
    fontWeight: '100',
  },
  source: {
    color: lightText,
    fontSize: 12,
    fontWeight: '100',
    marginTop: 5,
  },
})
