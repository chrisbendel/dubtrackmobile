'use strict';

import EventEmitter from 'event-emitter';
const RoomList = require('./lib/roomlist.js');
//const Protocol = require('./protocol.js'); //set dynamically at constructor

const User = require('./lib/user.js');
const PMManager = require('./lib/conversationmanager.js');

const roles = require('./lib/data/roles.js');

class DubBot extends EventEmitter {
  constructor(username, password, Protocol) {

    if (Protocol == undefined) Protocol = require('./lib/protocol/protocol.js');

    super();

    this.username = username;
    this.emitter = new EventEmitter();
    this.protocol = new Protocol();
    this.socket = null;
    this.rooms = new RoomList(this);
    this.pm = new PMManager(this);
    this.id = '';

    this.connected = false;

    if (username !== undefined && password !== undefined) {
      var that = this;
      this.protocol.account.login(username, password)
        .then(res => res.json())
        .then(() => {
          return that.protocol.account.info();
        })
        .then(userData => {
          let user = userData.data;
          that.id = user._id;
          that.emitter.emit('log-in');
          that.connected = true;
          that.rooms._joinRooms();
          that.pm._checkPM();
          that.pm.interval = setInterval(function () {
            that.pm._checkPM();
          }, that.pm.time);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.connected = true;
      this.rooms._joinRooms();
    }
  }

  join = function (room) {
    this.rooms.add(room);
  };

  postChat = function (message) {
    this.protocol.room.send(message);
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

module.exports = DubBot;
