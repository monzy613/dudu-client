import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/EvilIcons'

import { push as pushRoute } from 'navigationAction'
import DDUserHeader from 'DDUserHeader'
import DDNavbar from 'DDNavbar'
import {
  mainBlue,
  darkText,
  backgroundColor,
} from 'DDColor'

class More extends Component {
  gotoUserPage = () => {
    const { user } = this.props.user
    this.props.pushRoute({ key: 'user_page', title: '张', user })
  }

  renderRightButtons = () => {
    return [
      {
        content: <Icon name="gear" color={mainBlue} size={25} />,
        handler: undefined
      }
    ]
  }

  render = () => {
    const {
      user = {}
    } = this.props
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
            onPress={this.gotoUserPage}
            user={user}
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
    return {
      user: authState.get('user') && authState.get('user').toJS()
    }
  },
  { pushRoute }
)(More)
