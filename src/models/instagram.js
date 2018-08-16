import { queryInstagram } from '../services/instagram/api';

export default {
  namespace: 'instagram',

  state: {
    instagram : {},
  },

  effects: {

    *fetch({payload}, {call, put}) {
      alert("fetchinstagram");
      const response = yield call(queryInstagram, payload);
      yield put({
        type: 'savefetch',
        payload: response,
      });
    },
  },

  reducers: {
    savefetch(state, action) {
      return {
        ...state,
        instagram: action.payload && typeof(action.payload === 'Object') ? action.payload : {},
      };
    },



  },
};
