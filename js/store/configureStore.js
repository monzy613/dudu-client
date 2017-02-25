import {
  AsyncStorage,
  Platform
} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import isFunction from 'lodash/isFunction'

import reducer from './rootReducer'
import {
  rehydrateStart,
  rehydrateComplete,
} from './action'

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

  store.dispatch(rehydrateStart())

  const persistConfig = {
    blacklist: ['navigation'],
    storage: AsyncStorage,
  }

  persistStore(store, persistConfig, () => {
    store.dispatch(rehydrateComplete())
  })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
