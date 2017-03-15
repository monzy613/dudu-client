import React, { Component } from 'react'
import {
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native'
import isFunction from 'lodash/isFunction'
import * as Animatable from 'react-native-animatable'
import Slider from 'react-native-slider'

import {
  Themes,
  lightText,
} from 'DDColor'
import Icon from 'react-native-vector-icons/Ionicons'

const ICON_SIZE = 25

export default class RSSReaderToolbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selection: -1,
      showThemeToolbar: false,
    }
  }

  renderThemeToolbar = () => {
    const { onChangeTheme } = this.props
    const theme = Themes[this.props.theme]
    const width = Dimensions.get('window').width
    const height = width * 80.0 / 375.0
    const style = {
      position: 'absolute',
      width,
      backgroundColor: theme.navColor,
      height,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: lightText,
      top: -height,
    }
    return (
      <Animatable.View animation="fadeInUp" duration={200} style={style}>
        <View style={styles.sliderContainer}>
          <Icon name="ios-sunny" color={theme.iconColor} size={ICON_SIZE} />
          <Slider
            style={styles.slider}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
            minimumTrackTintColor={theme.iconColor}
            maximumTrackTintColor={lightText}
            thumbTintColor={theme.iconColor}
          />
          <Icon name="ios-sunny-outline" color={theme.iconColor} size={ICON_SIZE} />
        </View>
        <View style={styles.themeContainer}>
          {
            Themes.map((aTheme, index) => {
              return (
                <TouchableOpacity
                  key={`themeButton${index}`}
                  style={[styles.themeButton, { backgroundColor: aTheme.contentColor }]}
                  onPress={() => {
                    if (isFunction(onChangeTheme)) {
                      onChangeTheme(index)
                    }
                  }}
                />
              )
            })
          }
        </View>
      </Animatable.View>
    )
  }

  renderButton = item => {
    const {
      index,
      selectedIcon,
      unselectedIcon,
      selected,
      onSelected,
      onUnselected,
    } = item
    const theme = Themes[this.props.theme]
    return (
      <TouchableOpacity
        key={`toolButton${index}`}
        style={styles.button}
        onPress={() => {
          this.setState({ showThemeToolbar: false })
          if (selected) {
            this.setState({ selection: -1 })
            if(isFunction(onUnselected)) {
              onUnselected()
            }
          } else if (!selected) {
            this.setState({ selection: index })
            if (isFunction(onSelected)) {
              onSelected()
            }
          }
        }}
      >
        <Icon
          name={selected ? selectedIcon : unselectedIcon}
          color={theme.iconColor}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    )
  }

  render = () => {
    const {
      style,
    } = this.props
    const theme = Themes[this.props.theme]
    const {
      selection,
      showThemeToolbar,
    } = this.state
    const items = [
      {
        selectedIcon: 'ios-bookmark',
        unselectedIcon: 'ios-bookmark-outline',
        onSelected: () => alert('bookmarked'),
        onUnselected: () => alert('unbookmarked')
      },
      {
        selectedIcon: 'ios-sunny',
        unselectedIcon: 'ios-sunny-outline',
        onSelected: () => this.setState({ showThemeToolbar: true }),
      },
      {
        selectedIcon: 'ios-share',
        unselectedIcon: 'ios-share-outline',
        onSelected: () => alert('bookmarked'),
        onUnselected: () => alert('unbookmarked')
      },
    ]
    return (
      <Animatable.View
        animation="slideInUp"
        duration={200}
        style={[styles.container, { backgroundColor: theme.navColor }]}
      >
        { items.map((item, index) => {
          item.index = index
          item.selected = index === selection
          return this.renderButton(item)
        }) }
        { showThemeToolbar ? this.renderThemeToolbar() : null }
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    marginTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  sliderTrack: {
    marginTop: -1,
    height: 1,
  },
  sliderThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  themeContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingBottom: 10,
  },
  themeButton: {
    flex: 1,
    borderRadius: 2,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: StyleSheet.hairlineWidth / 4,
    borderColor: lightText,
  },
})
