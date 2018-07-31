import React, {Component, Fragment} from 'react';
import {queryCards, saveCard, createCard} from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    questioncards: [],
  },

  effects: {

    *fetchquestioncards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savefetchquestioncards',
        payload: response,
      });
    },

    *updatequestioncard({payload}, {call, put}) {
      const response = yield call(saveCard, payload);
      yield put({
        type: 'savecreatequestioncard',
        payload: response,
      });
    },

  },

  reducers: {
    savefetchquestioncards(state, action) {
      return {
        ...state,
        questioncards: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },

    savecreatequestioncard(state, action) {
      return {
        ...state,
        card: action.payload,
      };
    },

  },
};
