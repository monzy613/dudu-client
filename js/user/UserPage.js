import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import {
  pop as popRoute,
  push as pushRoute,
} from 'navigationAction'
import DDTimeline from 'DDTimeline'
import {
  mainBlue,
  darkText,
  backgroundColor,
} from 'DDColor'
import ddapi from 'ddapi'

class UserPage extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ds,
      timelines: [],
    }
  }

  componentDidMount = () => {
    this.fetchTimeline()
  }

  fetchTimeline = () => {
    ddapi.get('/timeline/getByUser', { params: {
      mobile: '15316699712'
    } })
    .then(timelines => this.setState({ timelines }))
    .catch(error => console.warn(error))
  }

  renderTimelineRow = timeline => {
    return (
      <DDTimeline timeline={timeline} />
    )
  }

  render = () => {
    const {
      ds,
      timelines
    } = this.state
    const dataSource = ds.cloneWithRows(timelines)
    return (
      <ParallaxScrollView
        backgroundColor={mainBlue}
        contentBackgroundColor={backgroundColor}
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello World!</Text>
          </View>
        )}>
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={this.renderTimelineRow}
        />
      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
})

export default connect(
  null,
  {
    pushRoute,
    popRoute,
  }
)(UserPage)
