import { stringify } from 'qs';
import request from '../../utils/request';

export async function queryCards(params) {
  return request('/api/real/cards', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function saveCard(params) {
  return request('/api/real/cards/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function createCard(params) {
  return request('/api/real/cards/new', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



export async function getCard(params) {
  return request('/api/real/cards/' + params.id, {
    method: 'GET',
  });
}

export async function sendCard(params) {
  return request('/api/real/send', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
