import request from '../utils/request';

export async function queryContent(params) {
  return request('/api/real/content', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
