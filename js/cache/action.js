/**
 * @providesModule cacheAction
 */

/**
 * 
 * @param {*} feed  feed可以为数组也可以为单个object内部拿到之后进行解析
 */
export const CACHE_RSS_FEED = 'CACHE_RSS_FEED'
export const cacheFeed = feed => ({
  type: CACHE_RSS_FEED,
  payload: feed,
})

export const CACHE_RSS_ITEM = 'CACHE_RSS_ITEM'
export const cacheItem = item => ({
  type: CACHE_RSS_ITEM,
  payload: item,
})

export const CACHE_USER = 'CACHE_USER'
export const cacheUser = user => ({
  type: CACHE_USER,
  payload: user,
})