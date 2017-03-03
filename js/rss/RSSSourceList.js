import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
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
import {
  clearRSSList,
  updateRSSList,
}from './action'

class RSSSourceList extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      ds,
    }
  }

  componentDidMount() {
    this.props.clearRSSList()
    InteractionManager.runAfterInteractions(() => {
      ddapi.get('/feed/overview')
        .then(data => {
          this.setState({ loading: false })
          this.props.updateRSSList(data)
        })
        .catch(error => {
          this.setState({ loading: false })
          // TODO: 提示弹框
          console.log(error)
        })
    })
  }

  renderRow = data => {
    const overview = data.toJS()

    return overview.key === 'add' ? (
      <RSSAddButton style={styles.waterFlowCell} onPress={this.gotoAppendNew} />
    ) : (
      <RSSWaterFlowView
        overview={overview}
        style={styles.waterFlowCell}
      />
    )
  }

  gotoAppendNew = () => {
    this.props.pushRoute({ key: 'rss_append_new' })
  }

  render = () => {
    const overviews = (this.props.overviews && this.props.overviews.toArray())
    overviews.push(fromJS({ key: 'add' }))
    const dataSource = this.state.ds.cloneWithRows(overviews)
    return (
      <DDNavigationLayout isRoot title="订阅源">
        {
          this.state.loading ? <DDSpinner /> : 
          (
            <ListView
              enableEmptySections
              style={styles.listView}
              contentContainerStyle={styles.listViewContentContainer}
              dataSource={dataSource}
              renderRow={this.renderRow}
            />
          )
        }
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
      overviews: state.getIn(['rss', 'overviews']),
    }
  },
  {
    pushRoute,
    clearRSSList,
    updateRSSList,
  }
)(RSSSourceList)
