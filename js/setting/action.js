export const SETTING_TEST = 'SETTING_TEST'
export const settingTest = () => ({
  type: SETTING_TEST
})

export const UPDATE_HOST = 'UPDATE_HOST'
export const updateHost = payload => ({
  type: UPDATE_HOST,
  payload,
})
