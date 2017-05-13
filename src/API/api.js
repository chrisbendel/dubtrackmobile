import EventEmitter from "react-native-eventemitter";
import {AsyncStorage} from 'react-native';
import User from './user/user';
import Room from './room/room';
import roles from './user/roles';
import PM from './message/privatemessages';

const base = 'https://api.dubtrack.fm/';

export default class api {
  constructor() {

    this.room = null;
    this.pm = new PM();
    this.loggedIn = false;
  }

  /******************/
  /* USER API CALLS */
  /******************/

  logout = function() {
    return fetch(base + 'auth/logout')
      .then(() => {
        AsyncStorage.removeItem('user').then(() => {
          console.log('Logged out');
        });
      })
  };

  login = function (username, password) {
    let login = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    };

    return fetch(base + 'auth/dubtrack', login)
      .then(res => res.json())
      .then(res => {
        if (res.code == 200) {
          return this.getUserInfo(username).then(user => {
            AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
              console.log('Logged in');
            });
          });
        } else {
          AsyncStorage.removeItem('user').then(() => {
            EventEmitter.emit('loginError', res.data.details.message);
          });
        }
      })
  };

  getUserInfo = function (user) {
    return fetch(base + 'user/' + user)
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  };

  /******************/
  /* ROOM API CALLS */
  /******************/

  // joinRoom = function (id) {
  //   this.socket.send(JSON.stringify({action: 10, channel: 'room:' + id}));
  //   this.room = new Room();
  //   return this.room.setupRoom(id);
  //   // this.room.getRoomUsers(id);
  //   // return this.room.joinRoom(id);
  // };

  // updateRoom = function () {
  //   return this.room.getRoomInfo(this.room.id);
  // };

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

  currentSong = function(id) {
    return fetch('https://api.dubtrack.fm/room/' + id + '/playlist/active')
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  };

  leaveRoom = function (id) {
    return this.room.leaveRoom(id);
  };

  getRoomUsers = function (id) {
    return this.room.getRoomUsers(id);
  };

  getRoomUser = function (room, id) {
    return this.getUserInfo(room, id);
  };

  chat = function (message) {
    this.room.send(this.room.info._id, message, this.room.info.realTimeChannel);
  };

  // setSocket = function () {
  //   let that = this;
  //   return fetch('https://api.dubtrack.fm/auth/token')
  //     .then(res => res.json())
  //     .then(json => {
  //       return new EngineIOClient({
  //       // that.socket = new EngineIOClient({
  //         hostname: 'ws.dubtrack.fm',
  //         secure: true,
  //         path: '/ws',
  //         query: {access_token: json.data.token},
  //         transports: ['websocket']
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  sendPM(users, message) {
    this.getConversation(users, function (conver) {
      conver.send(message);
    });
  }
}
