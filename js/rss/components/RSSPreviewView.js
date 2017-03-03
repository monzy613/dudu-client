import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'

import ddapi from 'ddapi'
import { push as pushRoute } from 'navigationAction'
import {
  darkText,
  lightText,
  shadowColor,
  mainBlue,
} from 'DDColor'
import {
  updateFeedReadState,
  updateFeedBookmarkState,
} from '../action'

class RSSPreviewView extends Component {

  bookmark = () => {
    const { source, id, bookmark } = this.props.item || {}
    if (!isEmpty(source) && !isEmpty(id)) {
      this.props.updateFeedBookmarkState({
        source, id,
        bookmark: !bookmark
      })
    }
  }

  gotoDetail = () => {
    const { source, id, read } = this.props.item || {}
    if (!isEmpty(source) && !isEmpty(id) && !read) {
      this.props.updateFeedReadState({
        source, id,
        read: true
      })
    }
  }

  render() {
    const {
      style = {},
      item = {},
    } = this.props
    const {
      title,
      publishDate,
      content,
      read,
      bookmark,
    } = item
    const formattedDate = moment(publishDate).format('YYYY-MM-DD')
    const BookmarkButton = bookmark ? (
      <Icon style={styles.bookmark} color={mainBlue} name="ios-bookmark" size={22} />
    ) : (
      <Icon style={styles.bookmark} color={mainBlue} name="ios-bookmark-outline" size={22} />
    )
    return (
      <Animatable.View
        style={[styles.container, style, read ? {} : styles.unread]}
        animation="fadeIn"
        duration={800}
      >
        <TouchableOpacity onPress={this.gotoDetail}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1} >{title}</Text>
            <TouchableOpacity onPress={this.bookmark}>
              { BookmarkButton }
            </TouchableOpacity>
          </View>
          <Text style={styles.summary} numberOfLines={5}>{content}</Text>
          <Text style={styles.publishDate} numberOfLines={1}>{formattedDate}</Text>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: mainBlue,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: darkText,
  },
  bookmark: {
  },
  summary: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '100',
    fontSize: 12,
    color: darkText,
  },
  publishDate: {
    textAlign: 'right',
    fontWeight: '100',
    fontSize: 10,
    color: lightText,
  },
})

export default connect(
  null ,
  {
    pushRoute,
    updateFeedReadState,
    updateFeedBookmarkState,
  }
)(RSSPreviewView)