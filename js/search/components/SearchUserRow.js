import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  darkText,
  lightText,
  divider,
  mainBlue,
} from 'DDColor'

export default class SearchUserRow extends Component {
  render = () => {
    const { user } = this.props
    return (
      <TouchableOpacity style={styles.container}>
        <Image style={styles.image} source={{ uri: 'http://ojiryy947.bkt.clouddn.com/blacksaber.jpg' }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.motto}>{user.motto}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>关注</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: divider,
    borderWidth: StyleSheet.hairlineWidth,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-around',
  },
  name: {
    flex: 1,
    color: darkText,
    fontWeight: '100',
  },
  motto: {
    fontSize: 12,
    color: lightText,
    fontWeight: '100',
  },
  buttonTitle: {
    fontSize: 12,
    color: mainBlue,
  },
  button: {
    padding: 5,
    borderColor: mainBlue,
    borderWidth: 1,
    borderRadius: 3,
  },
})
