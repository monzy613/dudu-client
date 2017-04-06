export const CLEAR_RSS_LIST = 'CLEAR_RSS_LIST'
export const clearRSSList = () => ({
  type: CLEAR_RSS_LIST
})

export const UPDATE_SUBSCRIBE_LIST = 'UPDATE_SUBSCRIBE_LIST'
export const updateSubscribes = payload => ({
  type: UPDATE_SUBSCRIBE_LIST,
  payload, // payload是{ [source]: feed }形式
})

export const UNSUBSCRIBE = 'UNSUBSCRIBE'
export const unsubscribe = source => ({
  type: UNSUBSCRIBE,
  payload: source,
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

export const UPDATE_READER_THEME = 'CHANGE_READER_THEME'
export const updateReaderTheme = theme => ({
  type: UPDATE_READER_THEME,
  payload: { theme },
})