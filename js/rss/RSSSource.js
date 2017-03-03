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
      loading: true,
      ds,
    }
  }

  componentDidMount = () => {
    const { source } = this.props.route && this.props.route.params && this.props.route.params
    InteractionManager.runAfterInteractions(() => {
      ddapi.get('/feed/getBySource', {
        params: { source }
      })
        .then(feeds => {
          this.setState({ loading: false })
          this.props.updateFeeds(feeds)
        })
        .catch(error => {
          this.setState({ loading: false })
          // TODO: 提示弹框
          console.log(error)
        })
    })
  }

  componentWillReceiveProps = props => {
    props.navigator && props.navigator.setRightItems([
      {
        content: <Icon style={{ backgroundColor: transparent }} name="ios-share-outline" size={25} color="white" />,
        handler: this.share
      }
    ])
  }

  share = () => {
    alert('share')
  }

  renderRow = item => {
    return (
      <RSSPreviewView style={styles.previewCell} item={item && item.toJS()} />
    )
  }

  render = () => {
    if (this.state.loading) {
      return <DDSpinner />
    }

    const { source } = this.props.route && this.props.route.params && this.props.route.params
    const feedList = (this.props.feeds.get(source) && this.props.feeds.get(source).toArray()) || []
    const dataSource = this.state.ds.cloneWithRows(feedList)

    return (
      <ListView
        enableEmptySections
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
  state => {
    return {
      feeds: state.getIn(['rss', 'feeds'])
    }
  },
  { pushRoute, updateFeeds }
)(RSSSource)