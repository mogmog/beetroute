import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryWaypoints(params) {
  return request('/api/real/waypoints', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

