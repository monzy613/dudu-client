/**
 * @providesModule DDRow
 */
import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  divider,
  darkText,
  backgroundColor,
} from 'DDColor'

export default class DDRow extends Component {
  render = () => {
    const {
      style = {},
      title,
      onPress,
    } = this.props

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="angle-right" size={15} color={backgroundColor} />
      </TouchableOpacity>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: divider,
  },
  title: {
    fontWeight: '100',
    color: darkText,
  },
})
