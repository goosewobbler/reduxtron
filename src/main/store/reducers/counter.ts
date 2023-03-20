import { Reducer } from '@reduxjs/toolkit';

const counterIncrement = (state: number) => state + 1;
const counterDecrement = (state: number) => state - 1;
const increaseBy = (state: number, payload: number = 0) => state + payload;

const counterActions = {
  INCREMENT: counterIncrement,
  DECREMENT: counterDecrement,
  INCREASE_BY: increaseBy,
} as const;

export type CounterAction =
  | { type: 'INCREMENT' | 'DECREMENT' }
  | { type: 'INCREASE_BY'; payload: number };

const counterReducer: Reducer<number, CounterAction> = (state, action) => {
  if (!action?.type) return state ?? 0;
  if (action.type in counterActions) {
    // @ts-expect-error
    return counterActions[action.type](state ?? 0, action.payload);
  }

  return state ?? 0;
};

export default counterReducer;