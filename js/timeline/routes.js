import React from 'react'
import Post from './Post'
import Timeline from './Timeline'

export default {
  'post': {
    render: props => <Post {...props} />
  },
  'timeline': {
    render: props => <Timeline {...props} />
  },
}
