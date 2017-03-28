/**
 * @providesModule rootAction
 */

export const REHYDRATE_COMPLETE = 'REHYDRATE_COMPLETE'
export const rehydrateComplete = () => ({
  type: REHYDRATE_COMPLETE
})

export const RESET_ALL_STATES = 'RESET_ALL_STATES'
export const resetAllStates = () => ({
  type: RESET_ALL_STATES
})
