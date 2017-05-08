import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import DDNavbar from 'DDNavbar'

describe('common components', () => {
  it('DDNavbar renders correctly', () => {
    const tree = renderer.create(<DDNavbar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})