import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  WebView,
  StyleSheet,
  InteractionManager,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { pop as popRoute } from 'navigationAction'
import ddapi from 'ddapi'
import { htmlStyleInjector } from 'ddutil'
import DDSpinner from 'DDSpinner'
import DDNavbar from 'DDNavbar'
import {
  Theme,
  transparent,
} from 'DDColor'

class RSSReader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      feedItem: undefined,
      theme: 1,
    }
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      ddapi.get('/feed/getFeedItem', { params: {
        url: this.props.route.params.url
      } })
      .then(feedItem => this.setState({ feedItem }))
      .catch(error => {
        this.setState({
          feedItem: {
            description: '<h3>网络连接失败</h3>'
          }
        })
        console.warn(error)
      })
    })
  }

  renderRightButtons = () => {
    const iconColor = Theme(this.state.theme).iconColor
    return [
      {
        content: <Ionicons style={{ backgroundColor: transparent }} name="ios-share-outline" size={25} color={iconColor} />,
        handler: this.props.popRoute
      }
    ]
  }

  renderBackButton = () => {
    const { popRoute } = this.props
    return {
      content: (
        <Icon
          name="angle-left"
          size={30}
          color={Theme(this.state.theme).iconColor}
        />
      ),
      handler: popRoute
    }
  }

  render = () => {
    const { feedItem } = this.state
    const theme = Theme(this.state.theme)

    const Navbar = (
      <DDNavbar
        color={theme.navColor}
        leftBtn={this.renderBackButton()}
        rightButtons={this.renderRightButtons()}
      />
    )
    if (isEmpty(feedItem)) {
      return (
        <View style={[styles.container, { backgroundColor: theme.contentColor }]}>
          { Navbar }
          <DDSpinner color={theme.iconColor} />
        </View>
      )
    }
    
    const { description } = feedItem
    const html = htmlStyleInjector({
      html: description,
      styles: {
        body: { background: theme.contentColor },
        p: { color: theme.textColor },
        h3: { color: theme.textColor }
      }
    })

    return (
      <View style={[styles.container, { backgroundColor: theme.contentColor }]}>
        { Navbar }
        <WebView style={{ backgroundColor: theme.contentColor }} source={{ html }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(
  null, { popRoute }
)(RSSReader)
