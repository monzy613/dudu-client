// 一级页面

import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
  RefreshControl,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import Icon from 'react-native-vector-icons/Ionicons'

import { push as pushRoute } from 'navigationAction'
import DDNavigationLayout from 'DDNavigationLayout'
import DDSpinner from 'DDSpinner'
import RSSWaterFlowView from './components/RSSWaterFlowView'
import RSSAddButton from './components/RSSAddButton'
import ddapi from 'ddapi'
import {
  cacheFeed,
  cacheUser,
} from 'cacheAction'
import {
  updateSubscribes,
  clearRSSList,
} from './action'
import { transparent } from 'DDColor'

class RSSSourceList extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      refreshing: true,
      ds,
    }
  }

  componentDidMount = () => InteractionManager.runAfterInteractions(() => this.fetchData())

  fetchData = () => {
    ddapi.get(`/feed/getSubscribesByUser/${this.props.mobile}`)
      .then(result => {
        this.setState({ refreshing: false })
        this.props.updateSubscribes(result)
        this.props.cacheFeed(result)
      })
      .catch(error => {
        this.setState({ refreshing: false })
        // TODO: 提示弹框
        console.warn(error)
      })

      // fetch user
      ddapi.get('/auth/getUser', { params: { mobile: this.props.mobile } })
      .then(result => this.props.cacheUser(result))
      .catch(error => console.warn(error))
  }

  renderRow = data => {
    const feed = data.toJS()

    return feed.key === 'add' ? (
      <RSSAddButton style={styles.waterFlowCell} onPress={this.gotoAppendNew} />
    ) : (
      <RSSWaterFlowView
        feed={feed}
        style={styles.waterFlowCell}
      />
    )
  }

  renderSearchButton = () => (
    {
      content: <Icon style={{ backgroundColor: transparent }} name="ios-search-outline" size={25} color="white" />,
      handler: () => this.props.pushRoute({ key: 'search' })
    }
  )

  gotoAppendNew = () => {
    this.props.pushRoute({ key: 'rss_append_new', title: '添加' })
  }

  render = () => {
    const feeds = (this.props.feeds && this.props.feeds.toArray())
    feeds.push(fromJS({ key: 'add' }))
    const dataSource = this.state.ds.cloneWithRows(feeds)
    return (
      <DDNavigationLayout
        isRoot
        title="订阅源"
        rightItems={[this.renderSearchButton()]}
      >
        <ListView
          enableEmptySections
          showsVerticalScrollIndicator
          style={styles.listView}
          contentContainerStyle={styles.listViewContentContainer}
          dataSource={dataSource}
          renderRow={this.renderRow}
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData}
            />
          )}
        />
      </DDNavigationLayout>
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  },
  listViewContentContainer: {
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  waterFlowCell: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    height: 0.75 * (Dimensions.get('window').width - 16 * 3) / 2,
  },
})

export default connect(
  state => {
    const subscribes = state.getIn(['rss', 'subscribes'])
    const feeds = state.getIn(['cache', 'feeds']).filter(feed => {
      const source = feed.get('source')
      return subscribes.includes(source)
    })
    return {
      feeds,
      mobile: state.getIn(['auth', 'user', 'mobile']),
    }
  },
  {
    pushRoute,
    updateSubscribes,
    cacheFeed,
    cacheUser,
    clearRSSList,
  }
)(RSSSourceList)
