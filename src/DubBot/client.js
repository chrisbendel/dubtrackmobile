'use strict';

import EventEmitter from 'event-emitter';
const User = require('./lib/user.js');
const PMManager = require('./lib/conversationmanager.js');
const Room = require('./lib/room.js');
const roles = require('./lib/data/roles.js');

export default class Client extends EventEmitter {
  constructor() {
    let Protocol = require('./lib/protocol/protocol.js');

    super();

    this.emitter = new EventEmitter();
    this.protocol = new Protocol();
    this.room = null;
    this.user = null;
    this.pm = new PMManager(this);
  }

  login = function (username, password) {
    return this.user = new User(username, password);
  };

  //       that.pm._checkPM();
  //       that.pm.interval = setInterval(function () {
  //         that.pm._checkPM();
  //       }, that.pm.time);

  joinRoom = function (id) {
    return this.room = new Room(id);
  };

  leaveRoom = function (id) {
    return this.room.leaveRoom(id);
  };


  logout = function () {
    this.user.logout();
  };

  chat = function (message) {
    this.room.send(this.room.info._id, message, this.room.info.realTimeChannel);
  };

  getUser(user, callback) {
    let that = this;
    this.protocol.user.info(user, function (data) {
      callback(new User(data, undefined, that));
    });
  }

  sendPM(users, message) {
    this.getConversation(users, function (conver) {
      conver.send(message);
    });

  }

  getConversation(users, callback) {
    if (users.constructor !== Array) {
      users = [users];
    }

    let usersid = [];
    for (let user of users) {
      usersid.push(user.id);
    }

    this.pm.getByUsers(usersid, callback);
  }

  _newPM(conver) {
    this.emit('private-message', conver);
  }

  toString() {
    return this.username;
  }

  //DubBot.roles is a thing, now
  static get roles() {
    return roles;
  }
}
