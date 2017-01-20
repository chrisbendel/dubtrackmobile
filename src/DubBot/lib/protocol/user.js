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

  image(userid, large, callback) {
    if (large !== undefined) {
      if (large.constructor === Function) {
        callback = large;
        large = false;
      }
    } else {
      large = false;
    }

    this.request({
      method: 'GET',
      url: 'user/' + userid + '/image' + (large ? '/large' : '')
    }, function (error, response, body) {
      if (callback != undefined) callback(response.caseless.dict.location);
    });
  }

  followers(userid, callback) {
    this.request({
      method: 'GET',
      url: 'user/' + userid + '/following'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  follow(userid, callback) {
    this.request({
      method: 'POST',
      url: 'user/' + userid + '/following'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  unfollow(userid, callback) {
    this.request({
      method: 'DELETE',
      url: 'user/' + userid + '/following'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }
}

module.exports = UserProtocol;
