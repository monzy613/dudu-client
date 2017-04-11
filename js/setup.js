import React, { Component } from 'react'
import { Provider } from 'react-redux'
import codePush from 'react-native-code-push'

import configureStore from './store/configureStore'
import Dudu from './dudu'

export default setup = () => {

  class Root extends Component {
    constructor(props) {
      super(props)
      this.store = configureStore()
    }

    componentDidMount = () => {
      codePush.sync({
        updateDialog: {
          appendReleaseDescription: true,
          descriptionPrefix: '\n\nChange log:\n',
        },
        installMode: codePush.InstallMode.IMMEDIATE
      })
    }

    render = () => {
      return (
        <Provider store={this.store}>
          <Dudu />
        </Provider>
      )
    }
  }

  return codePush(Root)
}

// Show network requests in chrome (http://localhost:8081/debugger-ui)
// if you do not like it, please comment following lines
if (__DEV__ && !!window.navigator.userAgent) {
  const XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest

  XMLHttpRequest = XHR
}
