import React from 'react'
import Setting from './Setting'
import UserSetting from './UserSetting'

export default {
  'setting': {
    render: props => <Setting {...props} />,
    navigationStyle: 'light',
  },
  'user_setting': {
    render: props => <UserSetting {...props} />,
    navigationStyle: 'light',
  },
  'more': {
    render: props => <More {...props} />
  },
}