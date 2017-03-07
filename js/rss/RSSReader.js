import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  WebView,
  StyleSheet,
} from 'react-native'
import HTMLView from 'react-native-htmlview'

import DDSpinner from 'DDSpinner'

const cssStringFromObject = object => {
  let result = ''
  for (tag in object) {
    let tempContent = ''
    const tagStyle = object[tag]
    for (styleKey in tagStyle) {
      const styleValue = tagStyle[styleKey]
      tempContent += `${styleKey}:${styleValue};`
    }
    result += `${tag}{${tempContent}}`
  }
  return result
}

const htmlStyleInjector = ({ html, styles }) => {
  if (typeof html !== typeof '') {
    return undefined
  }
  return `<body>${html}<style type='text/css'>${cssStringFromObject(styles)}</style></body>`
}


class RSSReader extends Component {
  render = () => {
    const { item } = this.props.route.params
    const { description } = item
    const html = htmlStyleInjector({
      html: description,
      styles: {
        body: { background: '#FAF4E8' },
        p: { color: 'blue' },
        h3: { color: 'red' }
      }
    })

    return (
      <WebView source={{ html }} />
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  a: {
    fontWeight: '300',
    color: 'red'
  },
})

export default connect(
  null, null
)(RSSReader)
