import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  WebView,
  StyleSheet,
  Platform,
  InteractionManager,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WebViewBridge from 'react-native-webview-bridge'

import { pop as popRoute } from 'navigationAction'
import { showActionSheet } from 'modalAction'
import ddapi from 'ddapi'
import { htmlStyleInjector } from 'ddutil'
import DDSpinner from 'DDSpinner'
import DDNavbar from 'DDNavbar'
import { cacheItem } from 'cacheAction'
import { updateReaderTheme } from './action'
import {
  Themes,
  transparent,
} from 'DDColor'
import RSSReaderToolbar from './components/RSSReaderToolbar'

class RSSReader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedItem: undefined,
      showBars: false,
    }
  }

  showActionSheet = () => {
    this.props.showActionSheet({
      message: '想做什么?',
      actions: [
        {
          title: '评论',
        },
        {
          title: '分享',
          handler: this.goToPost,
        },
        {
          title: '取消',
          type: 'cancel',
        }
      ]
    })
  }

  goToPost = () => {
    const { item } = this.props
    if (isEmpty(item)) {
      return
    }
    const {
      url,
      title,
      sourceTitle,
    } = item
    this.props.pushRoute({
      key: 'post',
      params: {
        type: 'item',
        payload: { url, title, sourceTitle }
      }
    })
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      const { url } = this.props.route.params
      ddapi.get('/feed/getFeedItem', { params: { url } })
      .then(feedItem => {
        this.setState({ feedItem })
        this.props.cacheItem({ [url]: feedItem })
      })
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

  toggleBars = () => {
    this.setState({ showBars: !this.state.showBars })
  }

  renderRightButtons = () => {
    const iconColor = Themes[this.props.theme].iconColor
    return [
      {
        content: <Ionicons style={{ backgroundColor: transparent }} name="ios-more" size={35} color={iconColor} />,
        handler: this.showActionSheet
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
          color={Themes[this.props.theme].iconColor}
        />
      ),
      handler: popRoute
    }
  }

  onBridgeMessage = jsonString => {
    const action = JSON.parse(jsonString)
    switch (action.type) {
      case 'onClick': {
        this.toggleBars()
        break
      }
      default:
        break
    }
  }

  render = () => {
    const {
      feedItem,
      showBars,
    } = this.state
    const { item } = this.props
    const theme = Themes[this.props.theme]

    const Navbar = (
      <DDNavbar
        color={theme.navColor}
        leftBtn={this.renderBackButton()}
        rightButtons={this.renderRightButtons()}
      />
    )
    if (isEmpty(item)) {
      return (
        <View style={[styles.container, { backgroundColor: theme.contentColor }]}>
          { Navbar }
          <DDSpinner color={theme.iconColor} />
        </View>
      )
    }
    
    const { description } = item
    const html = htmlStyleInjector({
      html: description,
      styles: {
        body: { background: theme.contentColor },
        a: { color: theme.textColor },
        li: { color: theme.textColor },
        p: { color: theme.textColor },
        h3: { color: theme.textColor },
        h2: { color: theme.textColor },
      }
    })

    return (
      <View style={[styles.container, { backgroundColor: theme.contentColor }]}>
        { showBars ? Navbar : <View style={{ height: Platform.OS === 'ios' ? 20 : 0 }} /> }
        <WebViewBridge
          style={{ flex: 1, backgroundColor: theme.contentColor }}
          source={{ html }}
          ref="WebViewBridge"
          onBridgeMessage={this.onBridgeMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        {
          showBars ? (
            <RSSReaderToolbar
              style={styles.toolbar}
              theme={this.props.theme}
              onChangeTheme={theme => this.props.updateReaderTheme(theme)}
            />
          ) : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    height: 50,
  },
})

export default connect(
  (state, props) => {
    const { url } = props.route.params
    const item = state.getIn(['cache', 'items', url]) && state.getIn(['cache', 'items', url]).toJS()
    return {
      item,
      theme: state.getIn(['rss', 'theme']),
    }
  }, {
    cacheItem,
    popRoute,
    updateReaderTheme,
    showActionSheet,
  }
)(RSSReader)
