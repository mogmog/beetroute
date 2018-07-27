import { queryCards, saveCard, createCard } from '../services/card/api';

export default {
  namespace: 'card',

  state: {
    questioncards: [],
    card : {}
  },

  effects: {

    * fetchquestioncards({payload}, {call, put}) {
      const response = yield call(queryCards, payload);
      yield put({
        type: 'savefetchquestioncards',
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
    }

  },
};
