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

import { push as pushRoute } from 'navigationAction'
import DDNavigationLayout from 'DDNavigationLayout'
import DDSpinner from 'DDSpinner'
import RSSWaterFlowView from './components/RSSWaterFlowView'
import RSSAddButton from './components/RSSAddButton'
import ddapi from 'ddapi'
import { updateRSSList } from './action'

class RSSSourceList extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      refreshing: true,
      ds,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData()
    })
  }

  fetchData = () => {
    ddapi.get(`/feed/getSubscribesByUser/${this.props.mobile}`)
      .then(data => {
        this.setState({ refreshing: false })
        this.props.updateRSSList(data)
      })
      .catch(error => {
        this.setState({ refreshing: false })
        // TODO: 提示弹框
        console.log(error)
      })
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

  gotoAppendNew = () => {
    this.props.pushRoute({ key: 'rss_append_new', title: '添加' })
  }

  render = () => {
    const feeds = (this.props.feeds && this.props.feeds.toArray())
    feeds.push(fromJS({ key: 'add' }))
    const dataSource = this.state.ds.cloneWithRows(feeds)
    return (
      <DDNavigationLayout isRoot title="订阅源">
        <ListView
          enableEmptySections
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
    return {
      feeds: state.getIn(['rss', 'feeds']),
      mobile: state.getIn(['auth', 'user', 'mobile']),
    }
  },
  {
    pushRoute,
    updateRSSList,
  }
)(RSSSourceList)
