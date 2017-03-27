import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SearchItemRow extends Component {
  render = () => {
    const { item } = this.props
    return (
      <View>
        <Text>item: {item.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})
