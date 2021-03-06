import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/EvilIcons'

import { push as pushRoute } from 'navigationAction'
import { showHud, showAlert } from 'modalAction'
import DDUserHeader from 'DDUserHeader'
import DDRow from 'DDRow'
import DDNavbar from 'DDNavbar'
import {
  mainBlue,
  darkText,
  backgroundColor,
} from 'DDColor'

class More extends Component {
  goToUserPage = () => {
    const { user } = this.props
    this.props.pushRoute({
      key: 'user_page',
      params: { user },
    })
  }

  goToTimeline = () => this.props.pushRoute({ key: 'timeline', title: '分享圈' })

  goToFollow = () => {
    const { user = {} } = this.props
    const { mobile } = user
    this.props.pushRoute({
      key: 'follow',
      title: '我的关注',
      params: { mobile }
    })
  }

  renderRightButtons = () => {
    return [
      {
        content: <Icon name="gear" color={mainBlue} size={25} />,
        handler: () => this.props.pushRoute({ key: 'setting', title: '设置' })
      }
    ]
  }

  render = () => {
    const { user = {} } = this.props
    const {
      followingCount,
      followerCount,
    } = user
    return (
      <View style={styles.container}>
        <DDNavbar
          color="white"
          rightButtons={this.renderRightButtons()}
          title={user.name}
          tintColor="black"
        />
        <ScrollView>
          <DDUserHeader
            onPress={this.goToUserPage}
            user={user}
          />
          <DDRow
            style={{ marginTop: 10 }}
            title="关注"
            onPress={this.goToFollow}
            type="follow"
            data={{
              followingCount,
              followerCount,
            }}
          />
          <DDRow
            style={{ marginTop: StyleSheet.hairlineWidth }}
            title="分享圈"
            onPress={this.goToTimeline}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  }
})

export default connect(
  state => {
    const authState = state.get('auth')
    const cacheState = state.get('cache')

    const mobile = authState.get('mobile')
    const user = cacheState.getIn(['users', mobile]) && cacheState.getIn(['users', mobile]).toJS()
    return { user }
  },
  {
    pushRoute,
    showHud,
    showAlert,
  }
)(More)

