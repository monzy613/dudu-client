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

import ddapi from 'ddapi'
import { push as pushRoute } from 'navigationAction'
import { unsubscribe } from '../action'
import {
  showHud,
  showAlert,
} from 'modalAction'
import {
  darkText,
  lightText,
  shadowColor,
  mainBlue,
} from 'DDColor'

class RSSWaterFlowView extends Component {
  goToPost = () => {
    const { feed = {} } = this.props
    const { title, source } = feed
    this.props.pushRoute({
      key: 'post',
      params: {
        type: 'source',
        payload: { title, source }
      }
    })
  }

  unsubscribe = () => {
    const { feed = {} } = this.props
    const {
      title,
      source,
    } = feed
    this.props.showAlert({
      message: `真的要取消订阅${title}吗？`,
      actions: [
        {
          title: '取消',
          type: 'cancel',
        },
        {
          title: '确定',
          type: 'destructive',
          handler: () => {
            this.props.showHud({ type: 'loading', text: '取消订阅中...' })
            ddapi.post('/feed/unsubscribe', { source })
            .then(() => {
              this.props.showHud({ type: 'success', text: '取消成功' })
              this.props.unsubscribe(source)
            })
            .catch(error => this.props.showHud({ type: 'error', text: error }))
          }
        }
      ],
    })
  }

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
            <TouchableOpacity onPress={this.unsubscribe} style={styles.button}>
              <Icon color="red" name="ios-remove-circle-outline" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToPost} style={styles.button}>
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
  button: {
    marginTop: 5,
    marginLeft: 10,
  },
})

export default connect(
  null,
  {
    pushRoute,
    showHud,
    showAlert,
    unsubscribe,
  }
)(RSSWaterFlowView)
