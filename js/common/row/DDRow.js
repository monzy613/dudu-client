/**
 * @providesModule DDRow
 */
import React, { Component } from 'react'
import {
  Image,
  View,
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
const ROW_TYPE_FOLLOW = 'follow'
const ROW_TYPE_USER = 'user'

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
        <Icon style={styles.icon} name="angle-right" size={15} color={lightGray} />
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

  renderFollowType = () => {
    const {
      style = {},
      onPress,
      title,
      data = {},
    } = this.props

    const {
      followingCount = 0,
      followerCount = 0,
    } = data

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.followContainer}>
          <View>
            <Text style={styles.largeText}>{followerCount}<Text style={styles.smallText}>人关注我</Text></Text>
            <Text style={styles.smallText}>已关注<Text style={styles.largeText}>{followingCount}</Text>人</Text>
          </View>
          <Icon style={styles.icon} name="angle-right" size={15} color={lightGray} />
        </View>
      </TouchableOpacity>
    )
  }

  renderUserType = () => {
    const {
      style = {},
      onPress,
      data = {},
    } = this.props
    const { user } = data
    return (
      <TouchableOpacity style={[styles.userRowContainer, style]} onPress={onPress}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.motto}>{user.motto}</Text>
        </View>
        <Icon style={styles.icon} name="angle-right" size={15} color={lightGray} />
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
      case ROW_TYPE_FOLLOW:
        return this.renderFollowType()
      case ROW_TYPE_USER:
        return this.renderUserType()
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
    flex: 1,
    fontWeight: '100',
    textAlign: 'right',
    color: lightText,
    fontSize: 12,
  },
  followContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  largeText: {
    fontWeight: '100',
    color: lightText,
    fontSize: 14,
  },
  smallText: {
    fontWeight: '100',
    color: lightText,
    fontSize: 12,
  },
  icon: {
    marginLeft: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: divider,
    borderWidth: StyleSheet.hairlineWidth,
  },
  userRowContainer: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-around',
  },
  name: {
    flex: 1,
    color: darkText,
    fontWeight: '100',
  },
  motto: {
    fontSize: 12,
    color: lightText,
    fontWeight: '100',
  },
})
