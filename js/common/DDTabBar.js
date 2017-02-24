/**
 * @providesModule DDTabBar
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { mainBlue, divider } from 'DDColor'
import { rssTabDefault, moreTabDefault } from 'DDImages'

const DDTabBar = React.createClass({
  propsTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
  },


  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(icon, name, page, isTabActive, onPressHandler) {
    return (
      <View key={name} style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onPressHandler(page)}
        >
          <Image style={styles.icon} source={isTabActive ? icon.selected : icon.default} />
        </TouchableOpacity>
        { page === this.props.tabs.length - 1 ? null : <View style={styles.divider} /> }
      </View>
    )
  },

  render() {
    const containerWidth = this.props.containerWidth
    const numberOfTabs = this.props.tabs.length

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const icon = this.props.tabIcons[page]
          const isTabActive = this.props.activeTab === page
          const renderTab = this.props.renderTab || this.renderTab
          return renderTab(icon, name, page, isTabActive, this.props.goToPage)
        })}
      </View>
    )
  },
})

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    margin: 12,
    resizeMode: 'contain'
  },
  divider: {
    backgroundColor: divider,
    width: StyleSheet.hairlineWidth,
    height: 40,
    left: StyleSheet.hairlineWidth / 2.0
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    height: 50,
    backgroundColor: mainBlue,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default DDTabBar
