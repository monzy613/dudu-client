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

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity)

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

    const title = overview && overview.title
    const subtitles = (overview && overview.subtitles) || []

    return (
      <Animatable.View
        style={[styles.contentContainer, style]}
        animation="fadeIn"
        duration={800}
      >
        <TouchableOpacity onPress={this.onPress}>
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
