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
import * as Animatable from 'react-native-animatable'

import { push as pushRoute } from 'navigationAction'

import {
  darkText,
  lightText,
  shadowColor,
  mainBlue,
} from 'DDColor'

class RSSWaterFlowView extends Component {
  onPress = () => {
    const link = this.props.feed && this.props.feed.link
    if (!isEmpty(link)) {
      this.props.pushRoute({ link })
    }
  }

  render = () => {
    const {
      style = {},
      feed = {},
    } = this.props

    const title = feed && feed.title
    const subtitles = ((feed && feed.itemOverviews) || []).map(overview => {
      return overview.title
    }).slice(0, 3)

    return (
      <Animatable.View
        style={[styles.contentContainer, style]}
        animation="fadeIn"
        duration={800}
      >
        <TouchableOpacity onPress={this.onPress} style={styles.container}>
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
            <TouchableOpacity>
              <Icon color={mainBlue} name="ios-share-outline" size={20} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom: 5,
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  container: {
    justifyContent: 'space-between',
  },
  mainTitle: {
    color: darkText,
    height: 15,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 8,
  },
  subtitle: {
    color: lightText,
    height: 13,
    fontSize: 12,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
})

export default connect(
  null,
  { pushRoute }
)(RSSWaterFlowView)
