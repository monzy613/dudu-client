import {
  AsyncStorage,
  Platform
} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import isFunction from 'lodash/isFunction'

import reducer from './rootReducer'

export default configureStore = onComplete => {

  const enhancers = composeWithDevTools({
    name: Platform.OS,
    port: 5680,
    hostname: 'localhost'
  })(
    autoRehydrate(),
  )

  const store = createStore(
    reducer,
    enhancers,
  )

  const persistConfig = {
    storage: AsyncStorage,
  }

  persistStore(store, persistConfig)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
