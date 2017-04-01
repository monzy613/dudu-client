import React, { Component } from 'react'
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import DDTimeline from 'DDTimeline'
import ddapi from 'ddapi'
import {
  transparent,
  backgroundColor,
} from 'DDColor'

class Timeline extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      timelines: [],
      ds,
    }
  }

  componentDidMount = () => {
    this.fetchTimeline()
  }

  componentWillReceiveProps = props => {
    props.navigator && props.navigator.setRightItems([
      {
        content: <Icon style={{ backgroundColor: transparent }} name="ios-create-outline" color="white" size={25} />,
        handler: this.goToPost,
      }
    ])
  }

  fetchTimeline = () => {
    ddapi.get('/timeline/getByUser', { params: {
      mobile: '15316699712'
    } })
    .then(timelines => this.setState({ timelines }))
    .catch(error => console.warn(error))
  }

  goToPost = () => this.props.pushRoute({ key: 'post' })

  renderTimelineRow = timeline => {
    return (
      <DDTimeline style={styles.timeline} timeline={timeline} />
    )
  }

  render = () => {
    const { ds, timelines } = this.state
    const dataSource = ds.cloneWithRows(timelines)
    return (
      <ListView
        enableEmptySections
        showsVerticalScrollIndicator
        renderRow={this.renderTimelineRow}
        style={styles.listView}
        dataSource={dataSource}
      />
    )
  }
}

const styles = StyleSheet.create({
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
  null, null
)(Timeline)
