import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native'

import DDDebug from 'DDDebug'
import DDButton from 'DDButton'
import DDNavbar from 'DDNavbar'
import { logo } from 'DDImages'
import {
  placeholderColor,
  mainBlue,
  disableColor,
} from 'DDColor'
import { isMobileLegal } from 'ddutil'
import ddapi from 'ddapi'
import { clearSet } from 'navigationAction'
import { obtainUserInfo } from 'authAction'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobile: '',
      password: '',
    }

    this.handleMobileInput = this.handleInput.bind(this, 'mobile')
    this.handlePasswordInput = this.handleInput.bind(this, 'password')
  }

  handleInput(type, value) {
    this.setState({ [type]: value })
  }

  login = () => {
    const validation = this.validate()
    if (!validation.success) {
      alert(validation.message)
      return
    }
    const { mobile, password } = this.state
    ddapi.post('/auth/login', { mobile, password })
    .then(result => {
      this.props.obtainUserInfo(result)
      this.props.clearSet({ key: 'home' })
    })
    .catch(error => console.warn(error))
  }

  validate = () => {
    const result = { success: false }
    const { mobile, password } = this.state
    if (!isMobileLegal(mobile)) {
      result.message = '请输入正确的账号'
    } else if (password.length < 6) {
      result.message = '请输入正确格式的密码'
    } else {
      result.success = true
    }
    return result
  }

  render = () => {
    const { goToRegister } = this.props
    const loginButtonBackgroundStyle = this.validate().success ? {} : { backgroundColor: disableColor }
    return (
      <View style={styles.container}>
        <DDNavbar transparent />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Image style={styles.logo} source={logo} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="rgba(0,0,0,0)"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              placeholder="请输入手机号"
              placeholderTextColor={placeholderColor}
              onChangeText={this.handleMobileInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.input}
              placeholder="请输入密码"
              secureTextEntry
              placeholderTextColor={placeholderColor}
              onChangeText={this.handlePasswordInput}
            />
          </View>
          <DDButton
            style={[styles.loginButton, loginButtonBackgroundStyle]}
            title="登录"
            onPress={this.login}
          />
          <DDButton
            style={styles.registerButton}
            titleStyle={styles.registerButtonTitle}
            title="注册"
            onPress={goToRegister}
          />
          <DDDebug style={styles.debug}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    overflow: 'visible',
  },
  contentContainerStyle: {
    paddingTop: 16,
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width - 60,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: placeholderColor,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 14,
    fontWeight: '100',
  },
  loginButton: {
    marginTop: 30,
    width: Dimensions.get('window').width - 60,
  },
  registerButton: {
    marginTop: 10,
    width: Dimensions.get('window').width - 60,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mainBlue,
  },
  registerButtonTitle: {
    color: mainBlue
  },
  debug: {
    height: 100,
    width: Dimensions.get('window').width,
  },
})

export default connect(
  null, { obtainUserInfo, clearSet }
)(Login)
