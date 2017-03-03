/**
 * @providesModule DDNavigationLayout
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  transparent,
  backgroundColor
} from 'DDColor'
import DDNavbar from 'DDNavbar'

export default class DDNavigationLayout extends Component {
  constructor(props) {
    super(props)
    this.state = { navigator: undefined }
  }

  render = () => {
    const {
      title,
      popRoute,
      children,
      rightBtn,
      isRoot,
    } = this.props

    const leftBtn = isRoot ? null : {
      content: <Icon style={styles.backIcon} name="angle-left" size={30} color="white" />,
      handler: popRoute
    }

    this.navigator = this.state.navigator

    return (
      <View style={styles.container}>
        <DDNavbar
          title={title}
          leftBtn={leftBtn}
          rightBtn={rightBtn}
          ref={bar => {
            if (isEmpty(this.state.navigator) && !isEmpty(bar && bar.navigator)) {
              this.setState({ navigator: bar.navigator })
            }
          }}
          {...this.props}
        />
        { children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: transparent
  },
  container: {
    flex: 1,
    backgroundColor,
  },
})