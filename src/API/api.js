import EventEmitter from 'event-emitter';
// const User = require('./user/user.js');
// const Room = require('./room/room.js');
// const roles = require('./user/roles.js');

import User from './user/user';
import Room from './room/room';
import roles from './user/roles';
import PM from './message/privatemessages';
let EngineIOClient = require('react-native-engine.io-client');

export default class Client extends EventEmitter {
  constructor() {
    super();

    this.emitter = new EventEmitter();
    this.room = null;
    this.user = null;
    this.pm = new PM();
    this.socket = null;
    this.loggedIn = false;
  }

  login = function (username, password) {
    this.user = new User();
    return this.user.login(username, password).then(() => {
      this.loggedIn = true;
    });
  };

  joinRoom = function (id) {
    if (this.room) {
      if (this.room.info._id != id) {
        this.room.leaveRoom(this.room.info._id);
      }
    }
    this.socket.send(JSON.stringify({action: 10, channel: 'room:' + id}));
    this.room = new Room(id);
    this.room.getRoomUsers(id);
    return this.room.joinRoom(id);
  };

  listRooms = function () {
    return fetch('https://api.dubtrack.fm/room')
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      })
  };

  filterRooms = function (q) {
    return fetch('https://api.dubtrack.fm/room/term/' + q)
      .then(res => res.json())
      .then((json) => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  };

  // leaveRoom = function (id) {
  //   return this.room.leaveRoom(id);
  // };

  getRoomUsers = function (id) {
    return this.room.getRoomUsers(id);
  };

  getRoomUser = function (room, id) {
    return this.room.getUserInfo(room, id);
  };

  logout = function () {
    this.loggedIn = false;
    this.user.logout();
    this.user = null;
  };

  chat = function (message) {
    this.room.send(this.room.info._id, message, this.room.info.realTimeChannel);
  };

  setSocket = function () {
    let that = this;
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        that.socket = new EngineIOClient({
          hostname: 'ws.dubtrack.fm',
          secure: true,
          path: '/ws',
          query: {access_token: json.data.token},
          transports: ['websocket']
        });
        that.socket.on('open', function () {
          console.log('socket open');
        });
        that.socket.on('close', function () {
          console.log('socket closed');
        });
        that.socket.on('error', function () {
          console.log('socket error');
        });
      })
      .catch(e => {
        console.log(e);
      });
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
