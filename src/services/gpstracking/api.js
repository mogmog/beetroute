import request from '../../utils/request';

export async function queryWaypoints(params) {
  return request('/api/real/waypoints', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryInstagram(params) {
  return request('/api/real/instagram/media', {
    method: 'GET',
    body: {
      ...params,
    },
  });
}



