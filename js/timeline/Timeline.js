import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import ddapi from 'ddapi'
import {
  transparent,
} from 'DDColor'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.navigatorIsSet = false
  }

  fetchTimeline = () => {
  }

  goToPost = () => {
    // return this.props.pushRoute({
    //   key: 'post',
    //   title: '发布',
    // })
    return this.props.pushRoute({
      key: 'post',
      title: '发布',
      params: {
        type: 'source',
        payload: {
          title: '唐巧的博客',
          source: 'http://blog.devtang.com/atom.xml'
        },
      }
    })
    this.props.pushRoute({
      key: 'post',
      title: '发布',
      params: {
        type: 'item',
        payload: {
          title: 'iOS移动开发周报-第45期',
          sourceTitle: '唐巧的博客',
          url: 'http://blog.devtang.com/2016/09/26/ios-weekly-45/'
        },
      }
    })
  }

  componentWillReceiveProps = props => {
    if (!this.navigatorIsSet) {
      props.navigator && props.navigator.setRightItems([
        {
          content: <Icon style={{ backgroundColor: transparent }} name="ios-create-outline" color="white" size={25} />,
          handler: this.goToPost,
        }
      ])
      this.navigatorIsSet = true
    }
  }

  render = () => {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(
  null, null
)(Timeline)
