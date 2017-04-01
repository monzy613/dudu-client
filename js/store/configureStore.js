import {
  AsyncStorage,
  Platform
} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import axios from 'axios'

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
    blacklist: [
      'rehydrate',
      'navigation',
      'modal',
    ],
    storage: AsyncStorage,
  }

  persistStore(store, persistConfig, () => {
    const authState = store.getState().get('auth')
    const token = authState.get('token')
    const host = authState.get('host')
    if (isEmpty(token)) {
      // 未登录
      axios.defaults.headers.common['Authorization'] = undefined
      store.dispatch(clearSet({ key: 'auth' }))
    } else {
      // 已登录
      axios.defaults.headers.common['Authorization'] = token
      store.dispatch(clearSet({ key: 'home' }))
    }

    axios.defaults.baseURL = `http://${host}:3000/api/`
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
