import request from '../utils/request';

export async function queryTargetGroups(params) {
  return request('/api/real/targetgroups', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
