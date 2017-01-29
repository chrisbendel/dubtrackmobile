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

    this.info = {};
    //this.currentSong = new Song();
    this.users = {};
    this._globalCD = new GlobalCD();
    this.socket = null;
    this.emitter = new EventEmitter();
    //TODO: add queue and userqueue to room model

    if (id) {
      this.getRoomInfo(id)
        .then(() => {
          this.joinRoom(this.info._id);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  //rewrite with this.room.id, this.room.realtimechannel
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
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.send()');
        console.log(json);
        return json;
      })
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

  getRoomUsers(room) {
    return fetch(base + 'room/' + room + '/users')
      .then(res => res.json())
      .then(json => {
        return this.users = json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  getUserInfo(room, user) {
    return fetch(base + 'room/' + room + '/users/' + user)
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.userInfo()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  joinRoom(id) {
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        return this.setSocket(json.data.token);
      })
      .then(() => {
        return this.socket.send(JSON.stringify({action: 10, channel: 'room:' + id}));
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
          .then(res => res.json())
          .then(json => {
            return json;
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setSocket(token) {
    this.socket = new EngineIOClient({
      hostname: 'ws.dubtrack.fm',
      secure: true,
      path: '/ws',
      query: {access_token: token},
      transports: ['websocket']
    });
    //socket listeners
    this.socket.on('open', function () {
      console.log('socket open');
    });
    this.socket.on('message', function (msg) {
      console.log('socket message');
      console.log(JSON.parse(msg));
    });
    this.socket.on('close', function () {
      console.log('socket closed');
    });
    this.socket.on('error', function () {
      console.log('socket error');
    });
    return this.socket;
  }

  setGlobalCD(o) {
    this._globalCD.setAllCD(o);
  }

  getUser(user, callback) {
    let that = this;
    this.dubbot.protocol.user.info(user, function (data) {
      callback(new User(data, that, that.dubbot));
    });
  }

  _onmessage(msg) {
    if (msg.type === 'chat-message') {
      let msgo = new Message(msg, this);

      if (msgo.content.charAt(0) === '!' && !this._globalCD.inCD(msgo.sender)) {
        var s = msg.message.split(/\s/g);
        if (this._commands.execute(s[0], s, msgo)) this._globalCD.used(msgo.sender);
      }

      //This event is triggered if is is no command
      this.emit('chat-message', msgo);

    } else if (msg.type === 'room_playlist-update') {
      if (msg.song != undefined) {
        if (this.currentSong == undefined || this.currentSong.id !== msg.song._id) {
          this.currentSong = new Song(msg, this);
          this.emit('song-change', this.currentSong);
        }
      }
    }
  }
}

module.exports = Room;
