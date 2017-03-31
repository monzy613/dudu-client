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

import {
  backgroundColor,
  mainBlue,
  lightText,
} from 'DDColor'

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

  render = () => {
    const {
      comments = [],
      style = {}
    } = this.props
    const dataSource = this.state.ds.cloneWithRows(comments)
    return (
      <ListView
        style={[styles.listView, style]}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections
        scrollEnabled={false}
        dataSource={dataSource}
        renderRow={this.renderComment}
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
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '100',
    lineHeight: 15,
    color: mainBlue,
  },
  contentText: {
    fontSize: 12,
    fontWeight: '100',
    color: lightText,
  },
})
