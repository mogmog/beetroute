import { queryWaypoints } from '../services/gpstracking/api';

export default {
  namespace: 'gpstracking',

  state: {
    waypoints: [],
  },


  effects: {

    *fetch({payload}, {call, put}) {
      const response = yield call(queryWaypoints, payload);
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
        waypoints: action.payload && typeof(action.payload.list === 'Array') ? action.payload.list : [],
      };
    },
  },
};
