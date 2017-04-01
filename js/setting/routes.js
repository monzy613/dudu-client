import React from 'react'
import Setting from './Setting'

export default {
  'setting': {
    render: props => <Setting {...props} />,
    navigationStyle: 'light',
  },
  'more': {
    render: props => <More {...props} />
  },
}