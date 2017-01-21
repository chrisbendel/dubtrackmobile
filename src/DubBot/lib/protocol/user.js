'use strict';

const base = 'https://api.dubtrack.fm/';

class UserProtocol {
  constructor() {
  }

  info(user) {
    return fetch(base + 'user/' + user)
      .then(res => res.json())
      .then(json => {
        console.log('inside user.info');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  image(userid, large) {
    if (large !== undefined) {
      if (large.constructor === Function) {
        large = false;
      }
    } else {
      large = false;
    }

    return fetch(base + 'user/' + userid + '/image' + (large ? '/large' : ''))
      .then(res => res.json())
      .then(json => {
        console.log('inside user.image()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
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
