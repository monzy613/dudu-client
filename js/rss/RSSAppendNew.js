import React, { Component } from 'react'
import {
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import { pop as popRoute } from 'navigationAction'
import {
  mainBlue,
  placeholderColor,
} from 'DDColor'

class RSSAppendNew extends Component {
  render = () => {
    return (
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          placeholder="请输入订阅源url"
          placeholderTextColor={placeholderColor}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle} >订阅</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 40,
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    fontSize: 14,
    fontWeight: '100',
    paddingLeft: 10,
  },
  button: {
    padding: 12,
    margin: 16,
    marginTop: 25,
    backgroundColor: mainBlue,
    borderRadius: 2,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '100',
    color: 'white',
  },
})

export default connect(
  null,
  { popRoute }
)(RSSAppendNew)