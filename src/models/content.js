import { queryContent } from '../services/content';
import {queryRule} from "../services/api";

export default {
  namespace: 'content',

  state: {
    list: [],
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryContent, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  },
};
