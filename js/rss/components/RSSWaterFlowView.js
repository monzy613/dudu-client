import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

import { push as pushRoute } from 'navigationAction'

import {
  darkText,
  lightText,
  shadowColor,
  mainBlue,
} from 'DDColor'

class RSSWaterFlowView extends Component {
  onPress = () => {
    const link = this.props.overview && this.props.overview.link
    if (!isEmpty(link)) {
      this.props.pushRoute({ link })
    }
  }

  render = () => {
    const {
      style = {},
      overview = {},
    } = this.props
    const {
      title = '',
      subtitles = [],
    } = overview
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={this.onPress}
      >
        <Text style={styles.mainTitle}>{title}</Text>
        { subtitles.map((subtitle, index) => (
          <Text
            key={index}
            numberOfLines={1}
            style={styles.subtitle}>
            {subtitle}
          </Text>
          ))
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={{ marginRight: 5 }}>
            <Icon color={mainBlue} name="ios-share-outline" size={20} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  mainTitle: {
    color: darkText,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 8,
  },
  subtitle: {
    color: lightText,
    fontSize: 12,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
})

export default connect(
  null,
  { pushRoute }
)(RSSWaterFlowView)
