import React, { Component } from 'react'
import {
  TextInput,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

import ddapi from 'ddapi'
import { pop as popRoute } from 'navigationAction'
import { showHud } from 'modalAction'
import { cacheFeed } from 'cacheAction'
import { updateSubscribes } from './action'
import DDButton from 'DDButton'
import {
  mainBlue,
  placeholderColor,
} from 'DDColor'

class RSSAppendNew extends Component {
  constructor(props) {
    super(props)
    this.state = { source: '' }
  }

  subscribe = () => {
    const { source } = this.state
    if (isEmpty(source)) {
      this.props.showHud({ type: 'error', text: '请输入订阅源' })
      return
    }
    ddapi.post(`/feed/subscribe`, { source })
    .then(feed => {
      this.props.updateSubscribes(feed)
      this.props.cacheFeed(feed)
      this.props.popRoute()
    })
    .catch(error => this.props.showHud({ type: error, text: error }))
  }

  render = () => {
    return (
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          placeholder="请输入订阅源url"
          placeholderTextColor={placeholderColor}
          onChangeText={source => this.setState({ source })}
        />
        <DDButton
          style={styles.submitButton}
          title="订阅"
          onPress={this.subscribe}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 40,
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    fontSize: 14,
    fontWeight: '100',
    paddingLeft: 10,
  },
  submitButton: {
    margin: 16,
    marginTop: 30,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '100',
    color: 'white',
  },
})

export default connect(
  null,
  {
    popRoute,
    cacheFeed,
    showHud,
    updateSubscribes,
  }
)(RSSAppendNew)