'use strict';

const base = 'https://api.dubtrack.fm/';

class AccountProtocol {
  constructor() {

  }

  login(username, password) {
    let login = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    };

    return fetch('https://api.dubtrack.fm/auth/dubtrack', login)
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    fetch(base + 'auth/logout')
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  }

  info() {
    return fetch(base + 'auth/session')
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        console.log(e);
      })
  };
}

module.exports = AccountProtocol;
