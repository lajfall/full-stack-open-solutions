import deepFreeze from 'deep-freeze'
import reducer, { initialState } from './reducer'

describe('UniCafe Reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const newState = reducer(undefined, { type: 'Do_NOTHING' })
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = reducer(state, { type: 'GOOD' })
    expect(newState).toEqual({ ...state, good: 1 })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = reducer(state, { type: 'OK' })
    expect(newState).toEqual({ ...state, ok: 1 })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = reducer(state, { type: 'BAD' })
    expect(newState).toEqual({ ...state, bad: 1 })
  })

  test('state is reset', () => {
    const state = initialState
    deepFreeze(state)
    const newState = reducer(reducer(state, { type: 'GOOD' }), { type: 'ZERO' })
    expect(newState).toEqual(state)
  })
})
