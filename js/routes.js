import React from 'react'
import merge from 'lodash/merge'
import mapValues from 'lodash/mapValues'
import isEmpty from 'lodash/isEmpty'

import DDNavigationLayout from 'DDNavigationLayout'
import Home from './home'

import { routes as auth } from './auth'
import { routes as rss } from './rss'

const RouteKeysWithOutNavigationBar = [
  'home',
  'auth',
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
      const navigator = this.layout && this.layout.navigator
      if (isEmpty(props.navigator) && !isEmpty(navigator)) {
        props.navigator = navigator
      }
      return (
        <DDNavigationLayout
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
