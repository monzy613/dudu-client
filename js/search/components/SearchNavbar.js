import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigationBarHeight } from 'ddutil'
import {
  mainBlue,
  transparent,
  placeholderColor,
} from 'DDColor'

export default class SearchNavbar extends Component {
  render = () => {
    const {
      placeholder,
      onChangeText,
      onCancelSingleSearch,
      popRoute,
      isSingleSearch,
    } = this.props
    return (
      <View style={styles.container}>
        { isSingleSearch ? (
          <TouchableOpacity style={styles.leftBackButton} onPress={onCancelSingleSearch}>
            <Icon style={styles.icon} name="angle-left" size={30} color="white" />
          </TouchableOpacity>
        ) : null }
        <View style={[styles.inputContainer, { marginLeft: isSingleSearch ? 10 : 16 }]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            style={styles.searchInput}
            underlineColorAndroid={transparent}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            onChangeText={onChangeText}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={popRoute}>
          <Text style={styles.buttonTitle}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: NavigationBarHeight,
    backgroundColor: mainBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBackButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputContainer: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '100',
  },
  buttonTitle: {
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
  }
})
