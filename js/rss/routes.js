import React from 'react'
import RSSSourceList from './RSSSourceList'
import RSSSource from './RSSSource'

export default {
  'rss_source_list': {
    render: props => <RSSSourceList {...props} />,
  },
  'rss_source': {
    render: props => <RSSSource {...props} />,
  }
}
