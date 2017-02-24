import React, { Component } from 'react'
import {
  BackAndroid,
  NavigationExperimental,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import {
  push as pushRoute,
  pop as popRoute
} from './action'
import routes from '../routes'

const { CardStack } = NavigationExperimental

const RouteScene = props => {
  const routeProps = {
    pushRoute: props.onPushRoute,
    popRoute: props.onPopRoute,
    route: props.route,
  }
  const scene = routes[props.route.key]
  return scene.render(routeProps)
}

class RootNavigator extends Component {
  componentDidMount() {
    this.backHandler = BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackAction = () => {
    const {
      navigation,
      popRoute
    } = this.props

    if (navigation.get('index') === 0) {
      return false
    }
    popRoute()
    return true
  }

  renderScene = ({ scene }) => (
    <RouteScene
      route={scene.route}
      onPushRoute={this.props.pushRoute}
      onPopRoute={this.handleBackAction}
    />
  )

  render = () => {
    return (
      <CardStack
        navigationState={this.props.navigation.toJS()}
        onNavigateBack={this.handleBackAction}
        renderScene={this.renderScene}
        style={styles.navigation}
      />
    )
  }
}

const styles = StyleSheet.create({
  navigation: {
    flex: 1,
  },
  navigatorContainer: {
    height: 55,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
})

export default connect(
  state => {
    return {
      navigation: state.get('navigation', {})
    }
  },
  { pushRoute, popRoute }
)(RootNavigator)