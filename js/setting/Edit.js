import React, { Component } from 'react'
import { connect } from 'react-redux'
import isFunction from 'lodash/isFunction'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native'
import isEmpty from 'lodash/isEmpty'

import { pop as popRoute } from 'navigationAction'
import {
  backgroundColor,
  transparent,
} from 'DDColor'

class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  componentWillReceiveProps = props => {
    const { navigator } = props
    if (!isEmpty(navigator)) {
      navigator.setRightItems([
        {
          content: <Text style={styles.submit}>确定</Text>,
          handler: this.submit,
        }
      ])
    }

    const defaultValue = props.route.params.defaultValue || ''
    this.setState({
      defaultValue,
      content: defaultValue,
    })
  }

  submit = () => {
    const { content } = this.state
    const onSubmit = this.props.route && this.props.route.params && this.props.route.params.onSubmit
    if (isFunction(onSubmit)) {
      onSubmit(content)
    }
    this.props.popRoute()
  }

  render = () => {
    const placeholder = this.props.route.params.placeholder || ''
    const { defaultValue } = this.state
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            defaultValue={defaultValue}
            autoCapitalize="none"
            autoFocus
            autoCorrect={false}
            style={styles.textInput}
            multiline={true}
            underlineColorAndroid={transparent}
            onChangeText={content => this.setState({ content })}
            placeholder={placeholder}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor,
  },
  submit: {
    color: 'white',
    fontWeight: '100',
  },
  inputContainer: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '100',
  },
})

export default connect(
  null,
  { popRoute }
)(Edit)
