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

import { push as pushRoute } from 'navigationAction'
import { showHud } from 'modalAction'
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
          onPress: this.editName,
        },
        {
          title: '签名',
          type: 'subtitle',
          data: {
            subtitle: user.motto,
          },
          onPress: this.editMotto,
        },
        {
          title: '修改密码',
          type: 'normal',
          onPress: this.changePassword,
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

  editName = () => this.props.pushRoute({
    key: 'edit',
    title: '名字',
    params: {
      placeholder: '请输入名字',
      defaultValue: this.props.user && this.props.user.name,
      onSubmit: name => {
        this.props.showHud({ type: 'loading', text: '修改中...' })
        ddapi.post('/auth/changeName', { name })
        .then(result => {
          this.props.showHud({ type: 'success', text: '修改名字成功' })
        })
        .catch(error => {
          this.props.showHud({ type: 'error', text: error })
          console.warn(error)
        })
      }
    },
  })

  editMotto = () => this.props.pushRoute({
    key: 'edit',
    title: '签名',
    params: {
      placeholder: '请输入签名',
      defaultValue: this.props.user && this.props.user.motto,
      onSubmit: motto => {
        this.props.showHud({ type: 'loading', text: '修改中...' })
        ddapi.post('/auth/changeMotto', { motto })
        .then(result => {
          this.props.showHud({ type: 'success', text: '修改签名成功' })
        })
        .catch(error => {
          this.props.showHud({ type: 'error', text: error })
          console.warn(error)
        })
      }
    },
  })

  changePassword = () => {}

  showPicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      const { token, key } = this.state
      const { path: uri } = image
      uploadFile({ uri, token, key })
      .then(result => {
        ddapi.post('/auth/changeAvatar', { key })
        .then(result => this.props.showHud({ type: 'success', text: '修改成功' }))
        .catch(error => console.warn(error))
      })
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
  }, {
    showHud,
    pushRoute,
  }
)(UserSetting)
