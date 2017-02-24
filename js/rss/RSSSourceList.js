import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'

import DDNavigationLayout from 'DDNavigationLayout'
import DDSpinner from 'DDSpinner'
import RSSWaterFlowView from './components/RSSWaterFlowView'
import ddapi from 'ddapi'
import {
  updateRSSList
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
  }

  renderRow = overview => (
    <RSSWaterFlowView
      overview={overview}
      style={styles.waterFlowCell}
    />
  )

  render = () => {
    const overviews = (this.props.overviews && this.props.overviews.toJS()) || []
    const dataSource = this.state.ds.cloneWithRows(overviews)
    return (
      <DDNavigationLayout isRoot title="订阅源">
        {
          this.state.loading ? <DDSpinner /> : 
          (
            <ListView
              enableEmptySections
              contentContainerStyle={styles.container}
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
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  waterFlowCell: {
    marginLeft: 16,
    marginTop: 16,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    height: 0.75 * (Dimensions.get('window').width - 16 * 3) / 2,
  },
})

export default connect(
  state => {
    return {
      overviews: state.getIn(['rss', 'overviews'])
    }
  },
  { updateRSSList }
)(RSSSourceList)
