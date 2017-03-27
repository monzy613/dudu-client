import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import {
  push as pushRoute,
  pop as popRoute,
} from 'navigationAction'

import {
  backgroundColor,
  mainBlue,
  lightText,
  lightGray,
} from 'DDColor'
import SearchNavbar from './components/SearchNavbar'
import SearchFeedRow from './components/SearchFeedRow'
import SearchItemRow from './components/SearchItemRow'
import SearchUserRow from './components/SearchUserRow'

import ddapi from 'ddapi'

const SEARCH_TYPE_DEFAULT = 'default'
const SEARCH_TYPE_FEED = 'feed'
const SEARCH_TYPE_ITEM = 'item'
const SEARCH_TYPE_USER = 'user'

const PlainButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

class Search extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      searchType: SEARCH_TYPE_DEFAULT,
      result: [],
      ds,
      query: '',
    }
  }

  placeholder = () => {
    const { searchType } = this.state
    if (searchType === SEARCH_TYPE_FEED) {
      return '搜索订阅源'
    } else if (searchType === SEARCH_TYPE_ITEM) {
      return '搜索文章'
    } else if (searchType === SEARCH_TYPE_USER) {
      return '搜索用户'
    } else {
      return '搜索订阅源, 文章, 用户'
    }
  }

  renderPlaceholder = () => {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.searchTitle}>搜索指定内容</Text>
        <View style={styles.buttonsContainer}>
          <PlainButton style={styles.rightDivider} title="订阅源" onPress={() => this.changeSearchType(SEARCH_TYPE_FEED)}/>
          <PlainButton style={styles.rightDivider} title="文章" onPress={() => this.changeSearchType(SEARCH_TYPE_ITEM)}/>
          <PlainButton title="用户" onPress={() => this.changeSearchType(SEARCH_TYPE_USER)}/>
        </View>
      </View>
    )
  }

  changeSearchType = newType => this.setState({ searchType: newType })

  renderResultList = () => {
    const { result } = this.state
    const dataSource = this.state.ds.cloneWithRows(result)
    return (
      <ListView
        enableEmptySections
        style={styles.listView}
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }

  renderRow = data => {
    switch (data.type) {
      case SEARCH_TYPE_FEED:
        return <SearchFeedRow style={styles.row} feed={data.feed} />
      case SEARCH_TYPE_ITEM:
        return <SearchItemRow style={styles.row} item={data.item} />
      case SEARCH_TYPE_USER:
        return <SearchUserRow style={styles.row} user={data.user} />
      default:
        return null
    }
  }

  onSearch = originKeyword => {
    const keyword = originKeyword.trim()
    this.setState({ query: keyword })
    ddapi.get('/search', { params: {
      type: this.state.searchType,
      keyword
    } })
    .then(result => {
      this.setState({ result })
      console.log(result)
    })
    .catch(err => {
      console.warn(err)
    })
  }

  render = () => {
    const {
      searchType,
      query,
    } = this.state
    return (
      <View style={styles.container}>
        <SearchNavbar
          isSingleSearch={searchType !== SEARCH_TYPE_DEFAULT}
          onCancelSingleSearch={() => this.changeSearchType(SEARCH_TYPE_DEFAULT)}
          placeholder={this.placeholder()}
          onChangeText={this.onSearch}
          popRoute={this.props.popRoute}
        />
        { isEmpty(query) ? this.renderPlaceholder() : this.renderResultList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor,
  },
  searchTitle: {
    marginTop: 30,
    color: lightText,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    height: 15,
  },
  button: {
    flex: 1,
  },
  rightDivider: {
    borderRightColor: lightGray,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  buttonTitle: {
    flex: 1,
    color: mainBlue,
    textAlign: 'center',
  },
  listView: {
    flex: 1,
  },
  row: {
    height: 40,
  },
})


export default connect(
  null,
  {
    popRoute,
    pushRoute,
  }
)(Search)