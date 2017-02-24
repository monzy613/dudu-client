import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Spinner from 'react-native-spinkit'

import RSSPreviewView from './components/RSSPreviewView'
import { push as pushRoute } from 'navigationAction'

class RSSSource extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      ds,
    }
  }

  renderRow = item => {
    return (
      <RSSPreviewView style={styles.previewCell} item={item} />
    )
  }

  render = () => {
    const items = [
      {
        read: false,
        bookmark: true,
        title: '《管理的实践》读书心得',
        publishDate: '2017-02-23T14:32:26.000Z',
        link: 'http://blog.devtang.com/2017/02/23/the-practice-of-management-by-drucker/',
        content: '<p>距离上一次自己在 App Store 发布个人 app 已经过去了两年多了。这段时间里把精力主要都放在了公司项目和继续进一步的学习中，倒也在日常工作和出书等方面取得了一些进展。个人 app 这块近两年虽然有写一些便捷的效率类应用，但是几次审核都被 Apple 无情拒掉以后，也就安心弄成自用的小工具了。看着自己逐渐发霉的开发者证书，果然觉得还是找时间倒腾点什么比较好。于是就有了现在想要介绍给大家的这个工具，<a href="https://mailmeapp.com">Mail Me</a> - 一个可以帮助你快速给自己发送邮件的小 app。</p> '
      },
      {
        read: false,
        bookmark: true,
        title: '《管理的实践》读书心得',
        publishDate: '2017-02-23T14:32:26.000Z',
        link: 'http://blog.devtang.com/2017/02/23/the-practice-of-management-by-drucker/',
        content: '<p>距离上一次自己在 App Store 发布个人 app 已经过去了两年多了。这段时间里把精力主要都放在了公司项目和继续进一步的学习中，倒也在日常工作和出书等方面取得了一些进展。个人 app 这块近两年虽然有写一些便捷的效率类应用，但是几次审核都被 Apple 无情拒掉以后，也就安心弄成自用的小工具了。看着自己逐渐发霉的开发者证书，果然觉得还是找时间倒腾点什么比较好。于是就有了现在想要介绍给大家的这个工具，<a href="https://mailmeapp.com">Mail Me</a> - 一个可以帮助你快速给自己发送邮件的小 app。</p> '
      },
      {
        read: true,
        bookmark: false,
        title: '《管理的实践》读书心得',
        publishDate: '2017-02-23T14:32:26.000Z',
        link: 'http://blog.devtang.com/2017/02/23/the-practice-of-management-by-drucker/',
        content: '<p>距离上一次自己在 App Store 发布个人 app 已经过去了两年多了。这段时间里把精力主要都放在了公司项目和继续进一步的学习中，倒也在日常工作和出书等方面取得了一些进展。个人 app 这块近两年虽然有写一些便捷的效率类应用，但是几次审核都被 Apple 无情拒掉以后，也就安心弄成自用的小工具了。看着自己逐渐发霉的开发者证书，果然觉得还是找时间倒腾点什么比较好。于是就有了现在想要介绍给大家的这个工具，<a href="https://mailmeapp.com">Mail Me</a> - 一个可以帮助你快速给自己发送邮件的小 app。</p> '
      },
    ]
    const dataSource = this.state.ds.cloneWithRows(items)
    return (
      <ListView
        enableEmptySections
        contentContainerStyle={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  previewCell: {
    height: 130,
    marginTop: 8,
    marginBottom: 8,
  },
})

export default connect(
  null,
  { pushRoute }
)(RSSSource)