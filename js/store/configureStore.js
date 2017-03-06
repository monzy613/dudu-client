import {
  AsyncStorage,
  Platform
} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import isFunction from 'lodash/isFunction'

import { clearSet } from 'navigationAction'
import reducer from './rootReducer'
import {
  rehydrateComplete,
} from './action'

export default configureStore = onComplete => {

  const enhancers = composeWithDevTools({
    name: Platform.OS,
    port: 5680,
    hostname: 'localhost',
  })(
    autoRehydrate(),
  )

  const store = createStore(
    reducer,
    enhancers,
  )

  const persistConfig = {
    blacklist: ['rehydrate', 'navigation'],
    storage: AsyncStorage,
  }

  persistStore(store, persistConfig, () => {
    const authState = store.getState().get('auth')
    store.dispatch(rehydrateComplete())
    if (authState && authState.get('token')) {
      // 已登录
      store.dispatch(clearSet({ key: 'home' }))
    } else {
      // 未登录
      store.dispatch(clearSet({ key: 'auth' }))
    }
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
