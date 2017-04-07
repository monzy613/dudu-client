import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import TabView from 'react-native-scrollable-tab-view'

import Follow, {
  FOLLOW_PAGE_TYPE_FOLLOWER,
  FOLLOW_PAGE_TYPE_FOLLOWING,
} from './Follow'
import {
  backgroundColor,
  mainBlue,
  lightText,
} from 'DDColor'

export default class Container extends Component {
  render = () => {
    const { mobile } = this.props.route.params
    return (
      <TabView
        style={styles.tabview}
        tabBarBackgroundColor="white"
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        tabBarActiveTextColor={mainBlue}
        tabBarInactiveTextColor={lightText}
      >
        <Follow
          tabLabel="关注"
          type={FOLLOW_PAGE_TYPE_FOLLOWING}
          mobile={mobile}
        />
        <Follow
          tabLabel="粉丝"
          type={FOLLOW_PAGE_TYPE_FOLLOWER}
          mobile={mobile}
        />
      </TabView>
    )
  }
}

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: mainBlue,
    height: 2,
    marginTop: 0,
  },
  tabview: {
    backgroundColor,
  },
})
