/**
 * @providesModule DDCommentRow
 */

import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

import {
  divider,
  darkText,
  lightText,
} from 'DDColor'
import { push as pushRoute } from 'navigationAction'

const AVATAR_WIDTH = 50

class DDCommentRow extends Component {
  goToUserPage = () => {
    const { comment = {} } = this.props
    const mobile = this.props.comment && this.props.comment.user && this.props.comment.user.mobile
    this.props.pushRoute({ key: 'user_page', params: { mobile } })
  }

  render = () => {
    const { comment = {} } = this.props
    const { user = {} } = comment
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToUserPage}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.comment}>{comment.content}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  avatar: {
    height: AVATAR_WIDTH,
    width: AVATAR_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    overflow: 'hidden',
    borderColor: divider,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    color: lightText,
    fontWeight: '100',
  },
  comment: {
    color: darkText,
    fontWeight: '100',
  },
})

export default connect(
  null,
  { pushRoute }
)(DDCommentRow)