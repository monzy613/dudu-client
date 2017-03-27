import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SearchUserRow extends Component {
  render = () => {
    const { user } = this.props
    return (
      <View>
        <Text>user: {user.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})
