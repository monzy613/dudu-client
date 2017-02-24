/**
 * @providesModule navigationAction
 */

/**
 * route: {
 *  key: string,
 *  params?: {}
 * }
 */

export const ROUTE_PUSH = 'ROUTE_PUSH'
export const push = route => ({
  type: ROUTE_PUSH,
  payload: route,
})

export const ROUTE_POP = 'ROUTE_POP'
export const pop = () => ({
  type: ROUTE_POP,
})

export const ROUTE_CLEAR = 'ROUTE_CLEAR'
export const clear = () => ({
  type: ROUTE_CLEAR
})

export const ROUTE_CLEAR_SET = 'ROUTE_CLEAR_SET'
export const clearSet = (route) => ({
  type: ROUTE_CLEAR_SET,
  payload: route
})
