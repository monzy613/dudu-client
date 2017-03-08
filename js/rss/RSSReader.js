import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  WebView,
  StyleSheet,
  InteractionManager,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import isEmpty from 'lodash/isEmpty'

import ddapi from 'ddapi'
import { htmlStyleInjector } from 'ddutil'
import DDSpinner from 'DDSpinner'

class RSSReader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      feedItem: undefined
    }
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      ddapi.get('/feed/getFeedItem', { params: {
        url: this.props.route.params.url
      } })
      .then(feedItem => this.setState({ feedItem }))
      .catch(error => console.warn(error))
    })
  }

  render = () => {
    const { feedItem } = this.state
    if (isEmpty(feedItem)) {
      return <DDSpinner />
    }
    
    const { description } = feedItem
    const html = htmlStyleInjector({
      html: description,
      styles: {
        body: { background: '#FAF4E8' },
        p: { color: 'blue' },
        h3: { color: 'red' }
      }
    })

    return (
      <WebView source={{ html }} />
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  a: {
    fontWeight: '300',
    color: 'red'
  },
})

export default connect(
  null, null
)(RSSReader)
