/**
 * @providesModule authAction
 */

export const OBTAIN_USER_INFO = 'OBTAIN_USER_INFO'
export const obtainUserInfo = ({ user, token }) => ({
  type: OBTAIN_USER_INFO,
  payload: { user, token }
})

export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'
export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})
