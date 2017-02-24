import {
  AsyncStorage,
  Platform
} from 'react-native'
import { createStore, compose } from 'redux'
import devtool from 'remote-redux-devtools'
// import { persistStore, autoRehydrate } from 'redux-persist'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import immutableTransform from 'redux-persist-transform-immutable'
import isFunction from 'lodash/isFunction'

import rootReducer from './rootReducer'

export default configureStore = onComplete => {
  const store = createStore(
    rootReducer,
    compose(
      // autoRehydrate(),
      devtool({
        name: Platform.OS,
        port: 5680,
        hostname: 'localhost'
      })
    )
  )

  // persistStore(store, {
  //   storage: AsyncStorage
  // }, () => {
  //   if (isFunction(onComplete)) {
  //     onComplete()
  //   }
  // })

  // devtool.updateStore(store)

  return store
}
