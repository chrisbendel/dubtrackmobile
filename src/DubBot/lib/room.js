'use strict';

import EventEmitter from 'EventEmitter';
const User = require('./user.js');
const Song = require('./song.js');

const base = 'https://api.dubtrack.fm/';
class Room extends EventEmitter {
  constructor(id = null) {
    super();

    this.info = null;
    //this.currentSong = new Song();
    this.users = [];
    this.chat = [];
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
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //<----- Room admin methods ----->


  //Room muted/banned users
  //Not sure if server side logic will prevent
  //a banned user from joining or need to use these
  muted(roomid) {
    return fetch(base + 'room/' + roomid + '/users/mute')
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.muted()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  banned(roomid) {
    return fetch(base + 'room/' + roomid + '/users/ban')
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.banned()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //<----- Room creation methods - Create room, update room info, delete room, etc ----->
  makeRoom(roomObject) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'roomObject': roomObject
      })
    };

    return fetch(base + 'room', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.make()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e)
      });
  }

}

module.exports = Room;
