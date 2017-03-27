import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native'

import {
  mainBlue,
} from 'DDColor'

import Login from './Login'
import Register from './Register'

import TabView from 'react-native-scrollable-tab-view'

const PAGE_LOGIN = 0
const PAGE_REGISTER = 1

export default class Auth extends Component {
  goToRegister = () => {
    this.tabView.goToPage(PAGE_REGISTER)
  }

  backHandler = () => {
    this.tabView.goToPage(PAGE_LOGIN)
  }

  render = () => {
    return (
      <TabView
        locked
        renderTabBar={() => <View style={styles.emptyTabbar} />}
        ref={tabView => this.tabView = tabView}
      >
        <Login tabLabel="login" goToRegister={this.goToRegister} />
        <Register tabLabel="register" backHandler={this.backHandler} />
      </TabView>
    )
  }
}

const styles = StyleSheet.create({
  emptyTabbar: {
    width: 0,
    height: 0,
  },
})
