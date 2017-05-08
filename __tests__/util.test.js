import { isMobileLegal } from 'ddutil'

describe('mobile is legal', () => {
  it('15316699712 is a legal mobile', () => {
    const result = isMobileLegal('15316699712')
    expect(result).toBe(true)
  })
  it('110 is an illegal mobile', () => {
    const result = isMobileLegal('110')
    expect(result).toBe(false)
  })
})