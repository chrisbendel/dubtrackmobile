'use strict';

const base = 'https://api.dubtrack.fm/';

class UserProtocol {

  constructor() {
  }

  followers(userid) {
    return fetch(base + 'user/' + userid + '/following')
      .then(res => res.json())
      .then(json => {
        console.log('inside user.followers()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  follow(userid) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'user/' + userid + '/following', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json in user.follow()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  unfollow(userid) {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'user/' + userid + '/following', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json in user.unfollow()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

module.exports = UserProtocol;
