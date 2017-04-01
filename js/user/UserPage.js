import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import {
  pop as popRoute,
  push as pushRoute,
} from 'navigationAction'
import DDTimeline from 'DDTimeline'
import DDNavbar from 'DDNavbar'
import {
  transparent,
  mainBlue,
  darkText,
  lightGray,
  backgroundColor,
} from 'DDColor'
import DDUserHeader from 'DDUserHeader'
import ddapi from 'ddapi'
import { NavigationBarHeight } from 'ddutil'


const AVATAR_SIZE = 120
const MINI_AVATAR_SIZE = 30
const ROW_HEIGHT = 60
const PARALLAX_HEADER_HEIGHT = 350

class UserPage extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = { ds, timelines: [] }
  }

  componentDidMount = () => this.fetchTimeline()

  fetchTimeline = () => {
    const { user = {} } = this.props.route.params
    ddapi.get('/timeline/getByUser', { params: {
      mobile: user.mobile
    } })
    .then(timelines => this.setState({ timelines }))
    .catch(error => console.warn(error))
  }

  renderTimelineRow = timeline => <DDTimeline style={styles.timeline} timeline={timeline} />

  // parallax header
  renderBackground = () => {
    const { user = {} } = this.props.route.params
    const imageSource = {
      uri: user.avatar,
      width: window.width,
      height: PARALLAX_HEADER_HEIGHT
    }
    return (
      <View>
        <Image source={imageSource}>
          <View style={plxStyles.backgroundCover}/>
        </Image>
      </View>
    )
  }

  renderForeground = () => {
    const { user = {} } = this.props.route.params
    const avatarSource = {
      uri: user.avatar,
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={plxStyles.contentContainer}>
          <Image style={plxStyles.image} source={avatarSource}/>
          <Text style={plxStyles.motto}>{user.motto}</Text>
        </View>
      </View>
    )
  }

  renderStickyHeader = () => {
    const { user = {} } = this.props.route.params
    return (
      <View style={[plxStyles.header, plxStyles.stickyBackground]}>
        <Image style={plxStyles.miniAvatar} source={{ uri: user.avatar }}/>
      </View>
    )
  }

  renderFixedHeader = () => {
    const { user = {} } = this.props.route.params
    const leftBtn = {
      content: <Icon name="angle-left" size={30} color="white" />,
      handler: this.props.popRoute,
    }
    return (
      <View key="fixed-header" style={plxStyles.header}>
        <DDNavbar
          title={user.name}
          leftBtn={leftBtn}
          color={transparent}
        />
      </View>
    )
  }

  renderScrollComponent = () => {
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={NavigationBarHeight}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={this.renderBackground}
        renderForeground={this.renderForeground}
        renderStickyHeader={this.renderStickyHeader}
        renderFixedHeader={this.renderFixedHeader}
      />
    )
  }

  render = () => {
    const { ds, timelines } = this.state
    const dataSource = ds.cloneWithRows(timelines)
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          enableEmptySections
          dataSource={dataSource}
          renderRow={this.renderTimelineRow}
          renderScrollComponent={this.renderScrollComponent}
        />
      </View>
    )
  }
}

const plxStyles = StyleSheet.create({
  backgroundCover: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderColor: lightGray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  miniAvatar: {
    height: MINI_AVATAR_SIZE,
    width: MINI_AVATAR_SIZE,
    borderRadius: MINI_AVATAR_SIZE / 2,
    marginTop: (Platform.OS === 'ios' ? 20 : 0) + 5,
    marginRight: 10,
    borderColor: lightGray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  motto: {
    marginTop: 30,
    fontWeight: '100',
    color: 'white',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: NavigationBarHeight,
  },
  stickyBackground: {
    backgroundColor: mainBlue,
    alignItems: 'flex-end'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  listView: {
    flex: 1,
    backgroundColor,
  },
  timeline: {
    borderTopWidth: 10,
    borderTopColor: backgroundColor
  },
})

export default connect(
  null,
  {
    pushRoute,
    popRoute,
  }
)(UserPage)
