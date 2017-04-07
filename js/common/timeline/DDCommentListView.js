/**
 * @providesModule DDCommentListView
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'

import {
  backgroundColor,
  mainBlue,
  lightText,
} from 'DDColor'
import DDLikeList from 'DDLikeList'

export default class DDCommentListView extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = { ds }
  }

  renderComment = comment => {
    const { name, content } = comment
    return (
      <View style={styles.commentContainer}>
        <Text style={styles.nameText}>
          {`${name} `}
          <Text style={styles.contentText}>{content}</Text>
        </Text>
      </View>
    )
  }

  renderLikeList = () => {
    const { likes = [] } = this.props
    if (isEmpty(likes)) {
      return null
    }
    return <DDLikeList likes={likes} />
  }

  render = () => {
    const {
      comments = [],
      style = {}
    } = this.props
    const dataSource = this.state.ds.cloneWithRows(comments)
    return (
      <ListView
        enableEmptySections
        style={[styles.listView, style]}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={false}
        dataSource={dataSource}
        renderRow={this.renderComment}
        renderHeader={this.renderLikeList}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor,
    borderRadius: 4,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  nameText: {
    fontWeight: '100',
    lineHeight: 15,
    color: mainBlue,
  },
  contentText: {
    fontWeight: '100',
    color: lightText,
  },
})
