import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native'

import DDButton from 'DDButton'
import DDNavbar from 'DDNavbar'
import { logo } from 'DDImages'
import { placeholderColor, mainBlue } from 'DDColor'

class Login extends Component {
  login = () => {
    // ddapi
  }

  render = () => {
    const { goToRegister } = this.props
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
              placeholder="请输入手机号"
              placeholderTextColor={placeholderColor}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="请输入密码"
              secureTextEntry
              placeholderTextColor={placeholderColor}
            />
          </View>
          <DDButton
            style={styles.loginButton}
            title="登录"
            onPress={this.login}
          />
          <DDButton
            style={styles.registerButton}
            titleStyle={styles.registerButtonTitle}
            title="注册"
            onPress={goToRegister}
          />
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
})

export default connect(
  null, null
)(Login)
