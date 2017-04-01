/**
 * @providesModule DDTimeline
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import ddapi from 'ddapi'
import { push as pushRoute } from 'navigationAction'
import DDReferredItem from 'DDReferredItem'
import DDReferredSource from 'DDReferredSource'
import DDCommentListView from 'DDCommentListView'
import {
  showCommentBar,
  showHud
} from 'modalAction'

import {
  mainBlue,
  lightGray,
  darkText,
  lightText,
  backgroundColor,
} from 'DDColor'

class DDTimeline extends Component {
  renderReferView = () => {
    const {
      referredItem = {},
      type,
    } = this.props.timeline
    switch (type) {
      case 'source': {
        return <DDReferredSource style={styles.refer} feed={referredItem} />
      }
      case 'item': {
        return <DDReferredItem style={styles.refer} item={referredItem} />
      }
      default:
        return null
    }
  }

  like = () => {
    const { _id: timelineID } = this.props.timeline
    ddapi.post('/timeline/like', { timelineID })
    .then(result => {
      // update in redux
    })
    .catch(error => console.warn(error))
  }

  comment = replyMobile => {
    const { _id: timelineID } = this.props.timeline
    this.props.showCommentBar({
      placeholder: '请输入评论',
      onSend: content => {
        this.props.showHud({ type: 'loading', text: '评论中...' })
        ddapi.post('/timeline/comment', {
          timelineID,
          content,
        })
        .then(result => {
          this.props.showHud({ type: 'success', text: '评论成功' })
          // update in redux
        })
        .catch(error => {
          console.warn(error)
          this.props.showHud({ type: 'error', text: error.toString() })
        })
      }
    })
  }

  renderLikeButton = liked => {
    return (
      <TouchableOpacity style={styles.smallButton} onPress={this.like}>
        <Icon
          name={liked ? 'ios-heart' : 'ios-heart-outline'}
          color={liked ? mainBlue : lightText}
          size={20}
        />
      </TouchableOpacity>
    )
  }

  renderCommentButton = () => {
    return (
      <TouchableOpacity style={styles.smallButton} onPress={this.comment}>
        <Icon name="ios-quote-outline" color={lightText} size={20} />
      </TouchableOpacity>
    )
  }

  renderCommentList = comments => {
    if (isEmpty(comments)) {
      return null
    }
    return <DDCommentListView comments={comments} />
  }

  render = () => {
    const {
      timeline = {},
      style = {},
    } = this.props
    const {
      user,
      content,
      publishDate,
      liked,
      comments
    } = timeline
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.container, style]}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <View style={styles.contentContainer}>
            { isEmpty(user.name) ? null : <Text style={styles.titleText}>{user.name}</Text> }
            { isEmpty(content) ? null : <Text style={styles.contentText}>{content}</Text> }
            { this.renderReferView() }
            <View style={styles.accessoryContainer}>
              <Text style={styles.publishDate}>{moment(publishDate).format('YYYY年M月DD日 HH:mm')}</Text>
              <View style={styles.buttonsContainer}>
                { this.renderLikeButton(liked) }
                { this.renderCommentButton() }
              </View>
            </View>
            { this.renderCommentList(comments) }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: lightGray,
  },
  contentContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    fontWeight: '100',
    color: darkText,
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
    color: lightText,
    fontWeight: '100',
  },
  publishDate: {
    fontWeight: '100',
    fontSize: 12,
    color: lightText,
  },
  accessoryContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  smallButton: {
    padding: 5,
  },
  refer: {
    marginTop: 10,
  },
  commentListView: {
    backgroundColor,
    borderRadius: 4,
  },
})

export default connect(
  null,
  {
    showHud,
    pushRoute,
    showCommentBar,
  }
)(DDTimeline)
