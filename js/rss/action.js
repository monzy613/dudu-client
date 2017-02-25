export const UPDATE_RSS_LIST = 'UPDATE_RSS_LIST'
export const updateRSSList = payload => ({
  type: UPDATE_RSS_LIST,
  payload  // payload 可以是数组 也可以是单独object, reducer里面会做处理
})

export const UPDATE_FEEDS = 'UPDATE_FEEDS'
export const updateFeeds = payload => ({
  type: UPDATE_FEEDS,
  payload  // payload 可以是数组 也可以是单独object, reducer里面会做处理
})
