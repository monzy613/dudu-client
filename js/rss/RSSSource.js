// 二级页面

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import DDSpinner from 'DDSpinner'
import ddapi from 'ddapi'
import RSSPreviewView from './components/RSSPreviewView'
import { push as pushRoute } from 'navigationAction'
import {
  transparent
} from 'DDColor'
import { updateFeeds } from './action'

class RSSSource extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      ds,
    }
  }

  componentWillReceiveProps = props => {
    props.navigator && props.navigator.setRightItems([
      {
        content: <Icon style={{ backgroundColor: transparent }} name="ios-share-outline" size={25} color="white" />,
        handler: this.goToPost
      }
    ])
  }

  goToPost = () => {
    const { feed = {} } = this.props
    const { title, source } = feed
    this.props.pushRoute({
      key: 'post',
      params: {
        type: 'source',
        payload: { title, source }
      }
    })
  }

  renderRow = item => {
    return (
      <RSSPreviewView
        style={styles.previewCell}
        item={item}
      />
    )
  }

  render = () => {
    if (this.state.loading) {
      return <DDSpinner />
    }

    const { source } = this.props.route && this.props.route.params && this.props.route.params
    const overviews = (this.props.overviews && this.props.overviews.toJS()) || []
    const dataSource = this.state.ds.cloneWithRows(overviews)

    return (
      <ListView
        enableEmptySections
        showsVerticalScrollIndicator
        style={styles.listView}
        contentContainerStyle={styles.listViewContentContainer}
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
  listViewContentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  previewCell: {
    marginTop: 8,
    marginBottom: 8,
  },
})

export default connect(
  (state, props) => {
    const source = props.route && props.route.params && props.route.params.source
    return {
      feed: state.getIn(['rss', 'feeds', source]) && state.getIn(['rss', 'feeds', source]).toJS(),
      overviews: state.getIn(['rss', 'feeds', source, 'itemOverviews'])
    }
  },
  { pushRoute, updateFeeds }
)(RSSSource)