/**
 * @providesModule DDUserRow
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import { push as pushRoute } from 'navigationAction'
import {
  showHud,
  showAlert,
} from 'modalAction'
import {
  darkText,
  lightGray,
  lightText,
  divider,
  mainBlue,
} from 'DDColor'
import ddapi from 'ddapi'

class DDUserRow extends Component {
  constructor(props) {
    super(props)

    this.state = { user: {} }
  }

  componentDidMount = () => this.setState({ user: this.props.user })

  goToUserPage = mobile => this.props.pushRoute({ key: 'user_page', params: { mobile } })

  follow = () => {
    const { user = {} } = this.state
    const { mobile } = user
    this.props.showHud({ type: 'loading', text: '关注中...' })
    ddapi.post('/follow/follow', { mobile })
    .then(() => {
      user.following = !user.following
      this.setState({ user })
      this.props.showHud({ type: 'success', text: '关注成功' })
    })
    .catch(error => {
      this.props.showHud({ type: 'error', text: `错误 ${error}` })
      console.warn(error)
    })
  }

  unfollow = () => {
    const { user = {} } = this.state
    const { mobile } = user
    this.props.showAlert({
      message: '确认取消关注吗?',
      actions: [
        {
          title: '取消',
          type: 'cancel',
        },
        {
          title: '确定',
          type: 'destructive',
          handler: () => {
            this.props.showHud({ type: 'loading', text: '取消关注中...' })
            ddapi.post('/follow/unfollow', { mobile })
            .then(() => {
              user.following = !user.following
              this.setState({ user })
              this.props.showHud({ type: 'success', text: '取消关注成功' })
            })
            .catch(error => {
              this.props.showHud({ type: 'error', text: `错误 ${error}` })
              console.warn(error)
            })
          }
        },
      ]
    })
  }

  renderButton = () => {
    const { following } = this.state.user
    const { currentUser = {} } = this.props
    if (following) {
      return (
        <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={this.unfollow}>
          <Text style={styles.graybButtonTitle}>已关注</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={this.follow}>
          <Text style={styles.buttonTitle}>关注</Text>
        </TouchableOpacity>
      )
    }
  }

  render = () => {
    const { user } = this.state
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.goToUserPage(user.mobile)}>
        <Image style={styles.image} source={{ uri: user.avatar }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.motto}>{user.motto}</Text>
        </View>
        { this.renderButton() }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: divider,
    borderWidth: StyleSheet.hairlineWidth,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-around',
  },
  name: {
    flex: 1,
    color: darkText,
    fontWeight: '100',
  },
  motto: {
    fontSize: 12,
    color: lightText,
    fontWeight: '100',
  },
  buttonTitle: {
    fontSize: 12,
    color: mainBlue,
  },
  graybButtonTitle: {
    color: lightGray,
  },
  button: {
    padding: 5,
    borderColor: mainBlue,
    borderWidth: 1,
    borderRadius: 3,
  },
  grayButton: {
    borderColor: lightGray,
  },
})

export default connect(
  state => {
    const authState = state.get('auth')
    return {
      currentUser: authState.get('user') && authState.get('user').toJS()
    }
  },
  {
    showHud,
    showAlert,
    pushRoute,
  }
)(DDUserRow)