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

import { push as pushRoute } from 'navigationAction'

import {
  darkText,
  lightText,
  shadowColor,
  mainBlue,
} from 'DDColor'

class RSSPreviewView extends Component {
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
      <TouchableOpacity style={[style, read ? {} : styles.unread]}>
        <Animatable.View
          style={styles.container}
          animation="fadeIn"
          duration={800}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1} >{title}</Text>
            <TouchableOpacity>
              { BookmarkButton }
            </TouchableOpacity>
          </View>
          <Text style={styles.summary} numberOfLines={5}>{content}</Text>
          <Text style={styles.publishDate} numberOfLines={1}>{formattedDate}</Text>
        </Animatable.View>
      </TouchableOpacity>
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
  { pushRoute }
)(RSSPreviewView)