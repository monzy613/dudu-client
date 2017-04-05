import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/Ionicons'

import DDReferredSource from 'DDReferredSource'
import DDReferredItem from 'DDReferredItem'
import ddapi from 'ddapi'
import {
  showHud,
  showAlert,
} from 'modalAction'
import { pop as popRoute } from 'navigationAction'

const TIMELINE_TYPE_TEXT = 'text'
const TIMELINE_TYPE_SOURCE = 'source'
const TIMELINE_TYPE_ITEM = 'item'

import {
  darkText,
  transparent,
} from 'DDColor'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' }
  }

  post = () => {
    const { params = {} } = this.props.route
    const {
      type = TIMELINE_TYPE_TEXT,
      payload,
    } = params
    this.props.showHud({ type: 'loading', text: '发布中' })
    ddapi.post('/timeline/postTimeline', { 
      content: this.state.content,
      type,
      payload,
     })
     .then(() => {
       this.props.showHud({ type: 'success', text: '发布成功' })
       this.props.popRoute()
     })
     .catch(error => this.props.showHud({ type: 'error', text: error.toString() }))
  }

  componentWillReceiveProps = props => {
    const { navigator } = props
    if (!isEmpty(navigator)) {
      props.navigator.setRightItems([
        {
          content: <Icon style={{ backgroundColor: transparent }} name="ios-send-outline" color="white" size={30} />,
          handler: this.post,
        }
      ])
      props.navigator.setTitle('发布')
    }
  }

  renderReferredView = type => {
    const payload = (this.props.route.params && this.props.route.params.payload) || {}
    switch (type) {
      case TIMELINE_TYPE_SOURCE: {
        return (
          <View style={styles.referContainer}>
            <DDReferredSource feed={payload} />
          </View>
        )
      }
      case TIMELINE_TYPE_ITEM: {
        return (
          <View style={styles.referContainer}>
            <DDReferredItem item={payload} />
          </View>
        )
      }
      default:
        return null
    }
  }

  render = () => {
    const { params = {} } = this.props.route
    const {
      type,
      payload,
    } = params
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            underlineColorAndroid={transparent}
            onChangeText={content => this.setState({ content })}
            placeholder="请输入内容"
          />
        </View>
        { this.renderReferredView(type) }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    height: 100,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  referContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
})

export default connect(
  null,
  {
    popRoute,
    showHud,
    showAlert,
  }
)(Post)
