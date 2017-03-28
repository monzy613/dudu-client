import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { push as pushRoute } from 'navigationAction'
import {
  mainBlue,
  darkText,
  lightText,
  divider,
} from 'DDColor'

class SearchItemRow extends Component {
  gotoDetail = () => {
    const { item = {} } = this.props
    const { link } = item
    this.props.pushRoute({ link })
  }

  render = () => {
    const { item } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={this.gotoDetail}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.sourceTitle}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{moment(item.publishDate).format('YYYY-MM-DD')}</Text>
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
    justifyContent: 'space-around',
    borderBottomColor: divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
})

export default connect(
  null,
  { pushRoute }
)(SearchItemRow)
