'use strict';

import EventEmitter from 'event-emitter';
const User = require('./lib/user.js');
const PMManager = require('./lib/conversationmanager.js');
const Room = require('./lib/room.js');
const roles = require('./lib/roles.js');

export default class Client extends EventEmitter {
  constructor() {
    super();

    this.emitter = new EventEmitter();
    this.room = null;
    this.user = null;
    this.pm = new PMManager(this);
  }

  login = function (username, password) {
    return this.user = new User(username, password);
  };

  joinRoom = function (id) {
    return this.room = new Room(id);
  };

  leaveRoom = function (id) {
    return this.room.leaveRoom(id);
  };

  getRoomUsers = function (id) {
    return this.room.getRoomUsers(id);
  };

  getRoomUser = function (room, id) {
    return this.room.getUserInfo(room, id);
  };

  logout = function () {
    this.user.logout();
  };

  chat = function (message) {
    this.room.send(this.room.info._id, message, this.room.info.realTimeChannel);
  };

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

  static get roles() {
    return roles;
  }
}
