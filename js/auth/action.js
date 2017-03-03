export const OBTAIN_USER_INFO = 'OBTAIN_USER_INFO'
export const obtainUserInfo = ({ user, token }) => ({
  type: OBTAIN_USER_INFO,
  payload: { user, token }
})
