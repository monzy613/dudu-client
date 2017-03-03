export const CLEAR_RSS_LIST = 'CLEAR_RSS_LIST'
export const clearRSSList = () => ({
  type: CLEAR_RSS_LIST
})

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

export const UPDATE_FEED_READ_STATE = 'UPDATE_FEED_READ_STATE'
export const updateFeedReadState = ({ source, id, read }) => ({
  type: UPDATE_FEED_READ_STATE,
  payload: { source, id, read }
})

export const UPDATE_FEED_BOOKMARK_STATE = 'UPDATE_FEED_BOOKMARK_STATE'
export const updateFeedBookmarkState = ({ source, id, bookmark }) => ({
  type: UPDATE_FEED_BOOKMARK_STATE,
  payload: { source, id, bookmark },
})