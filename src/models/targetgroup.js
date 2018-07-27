import { queryTargetGroups } from '../services/targetgroup';
import {queryRule} from "../services/api";

export default {
  namespace: 'targetgroup',

  state: {
    list: [],
  },

  effects: {

    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTargetGroups, payload);
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
