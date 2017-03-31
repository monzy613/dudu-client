/**
 * @providesModule DDReferredItem
 */
import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native'

import {
  backgroundColor,
  darkText,
  lightText,
} from 'DDColor'

export default class DDReferredItem extends Component {
  render = () => {
    const {
      item = {},
      onPress,
      style = {},
    } = this.props
    const {
      title,
      sourceTitle
    } = item
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <View style={styles.sourceTitleContainer}>
          <Text style={styles.sourceTitle}>{sourceTitle}</Text>
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  sourceTitleContainer: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: backgroundColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
  sourceTitle: {
    fontSize: 10,
    fontWeight: '100',
    color: darkText,
  },
  itemTitle: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    fontWeight: '100',
    color: lightText,
  },
})
