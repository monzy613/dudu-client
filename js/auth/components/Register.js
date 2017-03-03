import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import DDNavbar from 'DDNavbar'
import DDButton from 'DDButton'
import { logo } from 'DDImages'
import { placeholderColor, mainBlue } from 'DDColor'
import ddapi from 'ddapi'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      verifyCodeSend: false,
      countDown: 0,
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  renderBackButton = () => {
    const { backHandler } = this.props
    return {
      content: (
        <Icon
          style={styles.backIcon}
          name="angle-left"
          size={30}
          color={mainBlue}
        />
      ),
      handler: backHandler
    }
  }

  verifyCodeCountDown = () => {
    this.setState({ countDown: this.state.countDown - 1 })
    if (this.state.countDown > 0) {
      this.timer = setTimeout(this.verifyCodeCountDown, 1000)
    } else {
      this.setState({ countDown: 0 })
    }
  }

  sendVerifyCode = () => {
    // request
    this.setState({ countDown: 60, verifyCodeSend: true })
    this.timer = setTimeout(this.verifyCodeCountDown, 1000)
  }

  register = () => {
    // request
  }

  render = () => {
    const { verifyCodeSend, countDown } = this.state
    return (
      <View style={styles.container}>
        <DDNavbar
          transparent
          leftBtn={this.renderBackButton()}
        />
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
          { verifyCodeSend ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="请输入验证码"
                placeholderTextColor={placeholderColor}
              />
            </View>
          ) : null }
          <DDButton
            style={verifyCodeSend && countDown !== 0 ? styles.disabledButton : styles.submitButton }
            disabled={verifyCodeSend && countDown !== 0}
            titleStyle={verifyCodeSend && countDown !== 0 ? { color: mainBlue } : {}}
            title={verifyCodeSend && countDown !== 0 ? `${countDown}秒后重试` : '发送验证码'}
            onPress={this.sendVerifyCode}
          />
          { verifyCodeSend ? (
            <DDButton
              style={[styles.submitButton, { marginTop: 10 }]}
              title="注册"
              onPress={this.register}
            />
          ) : null }
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
  submitButton: {
    marginTop: 30,
    width: Dimensions.get('window').width - 60,
  },
  disabledButton: {
    marginTop: 30,
    width: Dimensions.get('window').width - 60,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mainBlue,
  },
  disabledButtonTitle: {
    color: mainBlue
  },
})

export default connect(
  null, null
)(Register)
