import React from 'react'
import RSSSourceList from './RSSSourceList'
import RSSSource from './RSSSource'
import  RSSAppendNew from './RSSAppendNew'
import RSSReader from './RSSReader'
import RSSComment from './RSSComment'

export default {
  'rss_source_list': {
    render: props => <RSSSourceList {...props} />,
  },
  'rss_source': {
    render: props => <RSSSource {...props} />,
  },
  'rss_append_new': {
    render: props => <RSSAppendNew {...props} />,
  },
  'rss_detail': {
    render: props => <RSSReader {...props} />,
  },
  'rss_comment': {
    render: props => <RSSComment {...props}/>,
    navigationStyle: 'light',
  },
}
