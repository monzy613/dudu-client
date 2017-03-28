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
  darkText,
  lightText,
  lightGray,
  divider,
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

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

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
    const sectionMap = {}
    const feedRows = []
    const itemRows = []
    const userRows = []
    result.map(item => {
      switch (item.type) {
        case SEARCH_TYPE_FEED: {
          feedRows.push(item)
          break
        }
        case SEARCH_TYPE_ITEM: {
          itemRows.push(item)
          break
        }
        case SEARCH_TYPE_USER: {
          userRows.push(item)
          break
        }
        default:
          break
      }
    })
    if (!isEmpty(feedRows)) {
      sectionMap[SEARCH_TYPE_FEED] = feedRows
    }
    if (!isEmpty(itemRows)) {
      sectionMap[SEARCH_TYPE_ITEM] = itemRows
    }
    if (!isEmpty(userRows)) {
      sectionMap[SEARCH_TYPE_USER] = userRows
    }
    const dataSource = this.state.ds.cloneWithRowsAndSections(sectionMap)
    return (
      <ListView
        enableEmptySections
        style={styles.listView}
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }

  renderSectionHeader = (data, sectionID) => {
    if (this.state.searchType !== SEARCH_TYPE_DEFAULT) {
      return null
    }
    let title = ''
    switch (sectionID) {
      case SEARCH_TYPE_FEED: {
        title = '订阅源'
        break
      }
      case SEARCH_TYPE_ITEM: {
        title = '文章'
        break
      }
      case SEARCH_TYPE_USER: {
        title = '用户'
        break
      }
      default:
        break
    }
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerDivider} />
      </View>
    )
  }

  renderRow = data => {
    switch (data.type) {
      case SEARCH_TYPE_FEED:
        return <SearchFeedRow feed={data.feed} />
      case SEARCH_TYPE_ITEM:
        return <SearchItemRow item={data.item} />
      case SEARCH_TYPE_USER:
        return <SearchUserRow user={data.user} />
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
  headerTitle: {
    color: darkText,
    fontSize: 12,
    fontWeight: '100'
  },
  headerContainer: {
    marginTop: 10,
    paddingLeft: 16,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  headerDivider: {
    marginTop: 5,
    flex: 1,
    backgroundColor: divider,
    height: StyleSheet.hairlineWidth,
  },
})

export default connect(
  null,
  {
    popRoute,
    pushRoute,
  }
)(Search)