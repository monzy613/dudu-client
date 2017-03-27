import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SearchFeedRow extends Component {
  render = () => {
    const { feed } = this.props
    return (
      <View>
        <Text>feed: {feed.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})