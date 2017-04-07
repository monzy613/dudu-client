import React, { Component } from 'react'
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'

import DDUserRow from 'DDUserRow'
import DDSpinner from 'DDSpinner'
import ddapi from 'ddapi'
import {
  backgroundColor
} from 'DDColor'

export const FOLLOW_PAGE_TYPE_FOLLOWING = 'following'
export const FOLLOW_PAGE_TYPE_FOLLOWER = 'follower'

export default class Follow extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ds,
      users: [],
    }
  }

  componentDidMount = () => {
    const {
      type,
      mobile,
    } = this.props

    let url

    switch (type) {
      case FOLLOW_PAGE_TYPE_FOLLOWER: {
        url = '/follow/getFollower'
        break
      }
      case FOLLOW_PAGE_TYPE_FOLLOWING: {
        url = '/follow/getFollowing'
        break
      }
    }

    ddapi.get(url, { params: { mobile } })
    .then(users => this.setState({ users }))
    .catch(error => console.warn(error))
  }

  renderUserRow = user => <DDUserRow user={user} />

  render = () => {
    const { users = [] } = this.state

    const dataSource = this.state.ds.cloneWithRows(users)
    return (
      <ListView
        enableEmptySections
        style={styles.listView}
        dataSource={dataSource}
        renderRow={this.renderUserRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
})
