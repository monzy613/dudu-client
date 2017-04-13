import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ListView,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import ImagePicker from 'react-native-image-crop-picker'

import { uploadFile } from 'ddutil'
import ddapi from 'ddapi'
import DDRow from 'DDRow'
import {
  divider,
  lightText,
} from 'DDColor'

class UserSetting extends Component {
  constructor(props) {
    super(props)

    const { user } = props

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ds,
      rows: [
        {
          title: '名字',
          type: 'subtitle',
          data: {
            subtitle: user.name,
          },
        },
        {
          title: '签名',
          type: 'subtitle',
          data: {
            subtitle: user.motto,
          },
        },
        {
          title: '修改密码',
          type: 'normal',
        }
      ]
    }
  }

  componentDidMount = () => {
    ddapi.get('/auth/getAvatarUploadInfo')
    .then(result => {
      const {
        token,
        key
      } = result
      this.setState({
        token,
        key,
      })
    })
    .catch(error => console.warn(error))
  }

  showPicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      const { token, key } = this.state
      const { path: uri } = image
      uploadFile({ uri, token, key })
      .then(result => console.log(result))
      .catch(error => console.warn(error))
    })
  }

  renderRow = row => <DDRow {...row} />

  renderHeader = () => {
    const { user } = this.props
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={this.showPicker}>
          <Image style={styles.avatar} source={{ uri: user.avatar }}>
            <View style={styles.editTitleContainer}>
              <Text style={styles.editTitle}>编辑</Text>
            </View>
          </Image>
        </TouchableOpacity>
        <View style={styles.mobileContainer}>
          <Text style={styles.mobile}>{user.mobile}</Text>
        </View>
      </View>
    )
  }

  render = () => {
    const { ds, rows } = this.state
    const dataSource = ds.cloneWithRows(rows)
    return (
      <ListView
        enableEmptySections
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
      />
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    overflow: 'hidden',
    borderColor: divider,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'flex-end',
  },
  editTitleContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTitle: {
    color: 'white',
    fontSize: 12,
  },
  mobileContainer: {
    paddingTop: 20,
  },
  mobile: {
    color: lightText,
    fontWeight: '100',
  },
})

export default connect(
  state => {
    const cacheState = state.get('cache')
    const mobile = state.getIn(['auth', 'mobile'])
    const user = cacheState.getIn(['users', mobile]) && cacheState.getIn(['users', mobile]).toJS()
    return { user }
  }, null
)(UserSetting)
