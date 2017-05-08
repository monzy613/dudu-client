import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import DDReferredSource from 'DDReferredSource'

describe('common components', () => {
  it('DDReferredSource renders correctly', () => {
    const tree = renderer.create(<DDReferredSource />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})