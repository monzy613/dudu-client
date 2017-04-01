import React from 'react'
import merge from 'lodash/merge'
import mapValues from 'lodash/mapValues'
import isEmpty from 'lodash/isEmpty'

import DDNavigationLayout from 'DDNavigationLayout'
import Home from './home'

import { routes as auth } from './auth'
import { routes as rss } from './rss'
import { routes as search } from './search'
import { routes as user } from './user'
import { routes as setting } from './setting'
import { routes as timeline } from './timeline'

import {
  mainBlue
} from 'DDColor'

const NAVIGATION_STYLE_DEFAULT = 'default'
const NAVIGATION_STYLE_LIGHT = 'light'

const RouteKeysWithOutNavigationBar = [
  'home',
  'auth',
  'search',
  'rss_detail',
  'user_page',
]

const routes = merge(
  {
    home: {
      render: props => <Home {...props} />,
      isRoot: true
    },
  },
  rss,
  auth,
  search,
  setting,
  user,
  timeline,
)

export default mapValues(routes, (route, key) => {
  // 不要navigationBar的直接返回route
  if (RouteKeysWithOutNavigationBar.includes(key)) {
    return {
      ...route,
      render: function(props) {
        return route.render(props)
      }
    }
  }

  return {
    ...route,
    render: function(props) {
      const title = route.title || props.route.title
      const { navigationStyle = NAVIGATION_STYLE_DEFAULT } = route
      const navigator = this.layout && this.layout.navigator
      if (isEmpty(props.navigator) && !isEmpty(navigator)) {
        props.navigator = navigator
      }
      return (
        <DDNavigationLayout
          color={navigationStyle === NAVIGATION_STYLE_LIGHT ? 'white' : mainBlue}
          tintColor={navigationStyle === NAVIGATION_STYLE_LIGHT ? mainBlue : 'white'}
          isRoot={route.isRoot}
          popRoute={props.popRoute}
          title={title}
          ref={layout => {
            this.layout = layout
            if (!isEmpty(layout)) {
              props.navigator = layout.navigator
              this.render(props)
            }
          }}
        >
          { route.render(props) }
        </DDNavigationLayout>
      )
    }
  }
})
