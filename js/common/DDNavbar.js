/**
 * @providesModule DDNavbar
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import isEmpty from 'lodash/isEmpty'

import { navigationBackground } from 'DDImages'
import { mainBlue, darkText, transparent } from 'DDColor'

const NAV_BAR_HEIGHT = 44
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0

const NavbarButton = (props) => (
  <TouchableOpacity
    style={styles.button}
    onPress={props.handler}
  >
    {props.children}
  </TouchableOpacity>
)

class DDNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tintColor: 'white',
      navigationStyle: {},
      hidden: false,
      rightItems: [],
      leftItems: [],
      backgroundImage: undefined,
    }
  }

  componentWillReceiveProps = newProps => {
    const {
      title,
      hidden = false
    } = newProps
    this.setState({ title, hidden })
  }

  renderButton(data, style, key) {
    return (
      <View style={[styles.buttonContainer, style]} key={key}>
        { data.handler ?
          <NavbarButton handler={data.handler}>
            {data.content}
          </NavbarButton> :
          <View style={styles.button}>
            {data.content}
          </View>
        }
      </View>
    )
  }

  render() {
    if (this.state.hidden) {
      return <View style={styles.hidden} />
    }
    const {
      navigationStyle,
      backgroundImage,
      title,
      tintColor,
      rightItems,
    } = this.state
    const {
      statusBar = {},
      color,
      style = {},
      leftBtn,
      rightButtons,
      transparent: isTransparent,
    } = this.props

    let containerColor = color ? { backgroundColor: color } : null
    if (isTransparent) {
      containerColor = { backgroundColor: transparent }
    }

    let RightButtonContainer = null
    if (!isEmpty(rightItems)) {
      RightButtonContainer = (
        <View style={styles.rightButtonsContainer}>
          { rightItems.map((item, index) => this.renderButton(item, {}, index)) }
        </View>
      )
    } else if (!isEmpty(rightButtons)) {
      RightButtonContainer = (
        <View style={styles.rightButtonsContainer}>
          { rightButtons.map((item, index) => this.renderButton(item, {}, index)) }
        </View>
      )
    }
    return (
      <View style={[styles.container, containerColor, navigationStyle]}>
        <View style={[styles.content, style]}>
          { !isEmpty(containerColor) ? null : (
            <Image
              style={[styles.imageBackground, style]}
              source={navigationBackground}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
          </View>
          { leftBtn && this.renderButton(leftBtn) }
          { RightButtonContainer }
        </View>
      </View>
    )
  }

  // universal navigator
  navigator = {
    title: this.props.title,
    setTitle: title => this.setState({ title }),
    setHidden: hidden => this.setState({ hidden }),
    setRightItems: rightItems => this.setState({ rightItems }),
    setLeftItems: leftItems => this.setState({ leftItems }),
    setTintColor: tintColor => this.setState({ tintColor }),
    setNavigationStyle: navigationStyle => this.setState({ navigationStyle }),
    setBackgroundImage: backgroundImage => this.setState({ backgroundImage }),
  }
}

const styles = StyleSheet.create({
  hidden: {
    height: STATUS_BAR_HEIGHT,
    width: Dimensions.get('window').width
  },
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBackground: {
    position: 'absolute',
    height: NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '100',
    backgroundColor: transparent,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row'
  },
})

export default DDNavbar