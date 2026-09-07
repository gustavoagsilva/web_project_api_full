import { API_BASE_URL, request } from './request.js';

export class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  Register({ email, password }) {
    return request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.data);
  }

  Login({ email, password }) {
    return request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  JWTVerification(token) {
    return request(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
  }
}

export default new Auth({ baseUrl: API_BASE_URL });
