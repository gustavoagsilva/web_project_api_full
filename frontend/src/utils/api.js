import { API_BASE_URL, request } from './request.js';

export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _request(path, token, method = 'GET', data) {
    return request(`${this._baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
    }).then((response) => response.data);
  }

  getUserInfo(token) {
    return this._request('/users/me', token);
  }

  setUserInfo(data, token) {
    return this._request('/users/me', token, 'PATCH', {
      name: data.name,
      about: data.about,
    });
  }

  setUserAvatar(data, token) {
    return this._request('/users/me/avatar', token, 'PATCH', { avatar: data.avatar });
  }

  getInitialCards(token) {
    return this._request('/cards', token);
  }

  addCard(data, token) {
    return this._request('/cards', token, 'POST', { name: data.name, link: data.link });
  }

  addLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, token, 'PUT');
  }

  removeLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, token, 'DELETE');
  }

  removeCard(cardId, token) {
    return this._request(`/cards/${cardId}`, token, 'DELETE');
  }
}

export default new Api({ baseUrl: API_BASE_URL });
