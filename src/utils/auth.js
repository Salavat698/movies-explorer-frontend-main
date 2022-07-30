import { mainApiURL } from './constants';

class Auth {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  };

  _checkServerResponse(item) {
    return item.ok ? item.json() : Promise.reject(item);
  };

  signUp({ password, name, email }) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    })
    .then((res) => this._checkServerResponse(res))
  };

  signIn({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
      }),
    })
    .then((res) => this._checkServerResponse(res))
  };

  signOut() {
    return fetch(`${this._address}/signout`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._checkServerResponse(res))
  };

  checkToken() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then((res) => this._checkServerResponse(res))
  };
};

const auth = new Auth({
  address: mainApiURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
