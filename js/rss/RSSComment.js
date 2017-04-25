import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  InteractionManager,
  StyleSheet,
  ListView,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'

import { cacheItemComments } from 'cacheAction'
import DDCommentRow from 'DDCommentRow'
import ddapi from 'ddapi'
import DDSpinner from 'DDSpinner'

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

  renderRow = comment => {
    return (
      <DDCommentRow comment={comment} />
    )
  }

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
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
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
    cacheItemComments
  }
)(RSSComment)
