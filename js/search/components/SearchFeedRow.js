import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { push as pushRoute } from 'navigationAction'
import {
  mainBlue,
  darkText,
  lightText,
  divider,
} from 'DDColor'

class SearchFeedRow extends Component {
  gotoRSSList = () => {
    const link = this.props.feed && this.props.feed.link
    console.log(this.props.feed)
    this.props.pushRoute({ link })
  }

  renderRightButton = () => {
    const subscribed = this.props.feed &&  this.props.feed.subscribed
    const color = subscribed ? 'red' : mainBlue
    const iconName = subscribed ? 'ios-remove-circle-outline' : 'ios-add-circle-outline'
    return (
      <TouchableOpacity style={styles.button}>
        <Icon name={iconName} color={color} size={20} />
      </TouchableOpacity>
    )
  }

  render = () => {
    const { feed = {} } = this.props
    // 最多只展示两条overview title
    const { itemOverviews } = feed

    const overviewTitles = (itemOverviews && itemOverviews.slice(0, 2) || [])
    .map(overview => overview.title)

    return (
      <TouchableOpacity style={styles.container} onPress={this.gotoRSSList}>
        <View style={styles.titleContainer} >
          <Text style={styles.title} numberOfLines={1}>{feed.title}</Text>
          { overviewTitles.map((title, index) => (
            <Text
              key={index}
              style={styles.subtitle}
              numberOfLines={1}
            >
              {title}
            </Text>
          )) || null }
        </View>
        { this.renderRightButton() }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: darkText,
    fontWeight: '100',
  },
  subtitle: {
    color: lightText,
    fontSize: 12,
    fontWeight: '100',
    marginTop: 5,
  },
  button: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(
  null,
  { pushRoute }
)(SearchFeedRow)