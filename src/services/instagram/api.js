import request from '../../utils/request';

export async function queryInstagram(params) {
  return request('/api/real/instagram/media', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



