/**
 * @providesModule DDLikeList
 */

import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { push as pushRoute } from 'navigationAction'
import {
  lightGray,
  lightText,
} from 'DDColor'

const AVATAR_WIDTH = 20

class DDLikeList extends Component {
  goToUserPage = mobile => this.props.pushRoute({ key: 'user_page', params: { mobile } })

  renderLike = (like, index) => {
    const {
      avatar,
      mobile,
    } = like
    return (
      <TouchableOpacity
        key={index}
        style={styles.like}
        onPress={() => this.goToUserPage(mobile)}
      >
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />
      </TouchableOpacity>
    )
  }

  render = () => {
    const { likes = [] } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} name="ios-heart" color={lightGray} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
          {likes.map((like, index) => this.renderLike(like, index))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  icon: {
    marginRight: 10,
  },
  scrollViewContentStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  like: {
    marginLeft: 5,
    marginVertical: 5,
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: lightGray,
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
  },
})

export default connect(
  null,
  { pushRoute }
)(DDLikeList)