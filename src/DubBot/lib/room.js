'use strict';

var EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from 'EventEmitter';

const User = require('./user.js');
const Song = require('./song.js');
const Message = require('./message.js');
const GlobalCD = require('./globalcd.js');
const base = 'https://api.dubtrack.fm/';

class Room extends EventEmitter {
  constructor(id = null) {
    super();

    this.info = null;
    //this.currentSong = new Song();
    this.users = [];
    this.chat = [];
    this._globalCD = new GlobalCD();
    this.socket = null;
    this.emitter = new EventEmitter();
    //TODO: add queue and userqueue to room model

    if (id) {
      this.joinRoom(id);
      this.getRoomUsers(id);
    }
  }

  joinRoom(id) {
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(() => {
        return this.getRoomInfo(id);
      })
      .then(() => {
        let obj = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
          },
        };
        return fetch('https://api.dubtrack.fm/room/' + id + '/users', obj)
      })
      .catch(e => {
        console.log(e);
      });
  }

  send(room, message, realTimeChannel) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'message': message,
        'realTimeChannel': realTimeChannel,
        'time': Date.now(),
        'type': 'chat-message'
      })
    };

    return fetch(base + 'chat/' + room, obj)
      .catch(e => {
        console.log(e);
      });
  }

  getRoomInfo(room) {
    return fetch(base + 'room/' + room)
      .then(res => res.json())
      .then(json => {
        return this.info = json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  leaveRoom(room) {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
    };
    return fetch(base + 'room/' + room + '/users', obj)
      .then(() => {
        console.log('left room');
      })
      .catch(e => {
        console.log(e);
      });
  }

  getRoomUsers(room) {
    return fetch(base + 'room/' + room + '/users')
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  getUserInfo(room, user) {
    return fetch(base + 'room/' + room + '/users/' + user)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

module.exports = Room;
