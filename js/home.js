import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import TabView from 'react-native-scrollable-tab-view'
import isEmpty from 'lodash/isEmpty'

import Setting from './setting'
import { routes } from './routes'
import RSSSourceList from './rss/RSSSourceList'
import DDTabBar from 'DDTabBar'
import {
  backgroundColor,
  transparent
} from 'DDColor'
import {
  rssTabDefault,
  rssTabSelected,
  moreTabDefault,
  moreTabSelected,
} from 'DDImages'

class Home extends Component {
  renderTabBar = () => {
    return (
      <DDTabBar
        tabIcons={[
          {
            default: rssTabDefault,
            selected: rssTabSelected
          },
          {
            default: moreTabDefault,
            selected: moreTabSelected
          }
        ]}
      />
    )
  }

  render() {
    return (
      <TabView
        locked
        scrollWithoutAnimation
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        tabBarPosition='bottom'
        initialPage={this.props.tab}
        renderTabBar={this.renderTabBar}
      >
        <RSSSourceList tabLabel="RSSSourceList" />
        <Setting tabLabel="setting" />
      </TabView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  },
  tabBarUnderlineStyle: {
    backgroundColor: transparent,
  },
})

export default connect(
  state => {
    const tab = state.get('navigation') && state.get('navigation').get('tab', 0)
    return { tab }
  }, null
)(Home)
