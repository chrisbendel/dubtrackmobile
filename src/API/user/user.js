'use strict';

import {
  AsyncStorage
} from 'react-native';

const roles = require('./roles.js');
const base = 'https://api.dubtrack.fm/';

export default class User {
  constructor() {
    this.info = null;
    //TODO: attach users playlist to the user object
    this.playlist = [];
  }

  //TODO: here down needs rewrites
  kick(msg) {
    this.dubbot.protocol.room.kick(this.room.id, this.id, this.room.realTimeChannel, msg);
  }

  mute(time) {
    if (this.room === undefined) return;

    this.dubbot.protocol.room.mute(this.room.id, this.id, this.room.realTimeChannel);

    let that = this;
    setTimeout(function () {
      that.unmute();
    }, time * 60000);
  }

  unmute() {
    if (this.room === undefined) return;

    this.dubbot.protocol.room.unmute(this.room.id, this.id, this.room.realTimeChannel);
  }

  ban(time) {
    if (this.room === undefined) return;

    this.dubbot.protocol.room.ban(this.room.id, this.id, this.room.realTimeChannel, time);
  }

  unban() {
    if (this.room === undefined) return;

    this.dubbot.protocol.room.unban(this.room.id, this.id, this.room.realTimeChannel);
  }

  hasRight(right) {
    if (this.room === undefined) return;

    return roles[this.roleid].rights.indexOf(right) >= 0;
  }

  getDubs(callback) {
    if (this.room === undefined) return;

    if (this.dubs === undefined) {
      let that = this;
      this.dubbot.protocol.room.userInfo(this.room.id, this.id, function (data) {
        that.dubs = data.dubs;
        if (callback !== undefined) callback(that.dubs);
      });
    } else {
      if (callback !== undefined) callback(this.dubs);
    }
  }

  sendPM(message) {
    this.dubbot.getConversation(this, function (c) {
      c.send(message);
    });
  }

  getConversation(callback) {
    this.dubbot.getConversation(this, callback);
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

  toString() {
    return this.username;
  }
}
