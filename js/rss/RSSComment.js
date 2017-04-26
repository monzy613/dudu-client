import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  InteractionManager,
  StyleSheet,
  ListView,
  View,
  Text,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'

import {
  cacheItemComments,
  cacheItemComment,
} from 'cacheAction'
import DDCommentRow from 'DDCommentRow'
import ddapi from 'ddapi'
import DDSpinner from 'DDSpinner'
import {
  mainBlue,
  divider,
} from 'DDColor'
import {
  showHud,
  showCommentBar,
} from 'modalAction'

class RSSComment extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ds,
      loading: true,
    }
  }

  componentDidMount = () => InteractionManager.runAfterInteractions(() => this.fetchComment())

  componentWillReceiveProps = props => {
    const { navigator } = props
    if (!isEmpty(navigator)) {
      navigator.setRightItems([
        {
          content: <Text style={styles.comment}>评论</Text>,
          handler: this.comment,
        }
      ])
    }
  }

  fetchComment = () => {
    const { url } = this.props
    if (isEmpty(url)) {
      console.warn('url 不可为空')
      return
    }
    ddapi.get('/feed/getComments', {
      params: { url }
    })
    .then(comments => {
      this.props.cacheItemComments({ [url]: comments })
      this.setState({ loading: false })
    })
    .catch(error => {
      console.warn(error)
      this.setState({ loading: false })
    })
  }

  comment = () => {
    const { url } = this.props
    this.props.showCommentBar({
      placeholder: '请输入评论',
      onSend: content => {
        this.props.showHud({ type: 'loading', text: '评论中...' })
        ddapi.post('/feed/comment', {
          url,
          content,
        })
        .then(_ => {
          this.props.showHud({ type: 'success', text: '评论成功' })
          this.fetchComment()
        })
        .catch(error => {
          console.warn(error)
          this.props.showHud({ type: 'error', text: error.toString() })
        })
      }
    })
  }

  renderRow = comment => {
    return (
      <DDCommentRow comment={comment} />
    )
  }

  renderSeparator = (sectionID, rowID) => (
    <View key={rowID} style={styles.divider} />
  )

  render = () => {
    const { comments } = this.props
    const { ds, loading } = this.state
    if (loading && isEmpty(comments)) {
      return <DDSpinner />
    }

    const dataSource = ds.cloneWithRows(comments)
    return (
      <ListView
        style={styles.listView}
        enableEmptySections
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  comment: {
    color: mainBlue,
    fontWeight: '100',
  },
  divider: {
    backgroundColor: divider,
    height: StyleSheet.hairlineWidth,
  },
})

export default connect(
  (state, props) => {
    const { url } = props.route.params
    const comments = (state.getIn(['cache', 'comments', url]) && state.getIn(['cache', 'comments', url]).toJS()) || []
    return {
      url,
      comments,
    }
  }, {
    cacheItemComments,
    cacheItemComment,
    showHud,
    showCommentBar,
  }
)(RSSComment)
