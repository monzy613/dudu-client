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
import Switch from 'react-native-switch-pro'

import {
  mainBlue,
  divider,
  darkText,
  lightText,
  lightGray,
  backgroundColor,
} from 'DDColor'

const ROW_TYPE_NORMAL = 'normal'
const ROW_TYPE_DESTRUCTIVE = 'destructive'
const ROW_TYPE_SUBTITLE = 'subtitle'
const ROW_TYPE_SWITCH = 'switch'

export default class DDRow extends Component {

  renderNormalType = () => {
    const {
      style = {},
      title,
      onPress,
    } = this.props

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="angle-right" size={15} color={lightGray} />
      </TouchableOpacity>
    )
  }

  renderDestructiveType = () => {
    const {
      style = {},
      title,
      onPress,
    } = this.props

    return (
      <TouchableOpacity style={[styles.container, styles.destructiveContainer, style]} onPress={onPress}>
        <Text style={styles.destructiveTitle}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderSubtitleType = () => {
    const {
      style = {},
      title,
      onPress,
      data = {}
    } = this.props

    const { subtitle } = data

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </TouchableOpacity>
    )
  }

  renderSwitchType = () => {
    const {
      style = {},
      title,
      onPress,
      data = {}
    } = this.props

    const { on } = data

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Switch
          width={35}
          defaultValue={on}
          backgroundActive={mainBlue}
          backgroundInactive={lightGray}
        />
      </TouchableOpacity>
    )
  }

  render = () => {
    const { type = ROW_TYPE_NORMAL } = this.props

    switch (type) {
      case ROW_TYPE_DESTRUCTIVE:
        return this.renderDestructiveType()
      case ROW_TYPE_SUBTITLE:
        return this.renderSubtitleType()
      case ROW_TYPE_SWITCH:
        return this.renderSwitchType()
      default:
        return this.renderNormalType()
    }
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
  destructiveContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'red',
    borderTopColor: 'red',
    justifyContent: 'center',
  },
  destructiveTitle: {
    fontWeight: '100',
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontWeight: '100',
    color: darkText,
  },
  subtitle: {
    fontWeight: '100',
    color: lightText,
    fontSize: 12,
  }
})
