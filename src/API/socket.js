let EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from "react-native-eventemitter";
import {AsyncStorage} from 'react-native';
export default class Socket {

  constructor(userid = null) {
    this.user = null;
    this.sock = null;

    this.create(userid);
  }

  create(user) {
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        return new EngineIOClient({
          hostname: 'ws.dubtrack.fm',
          secure: true,
          path: '/ws',
          query: {access_token: json.data.token},
          transports: ['websocket', 'polling']
        })
      }).then(socket => {
        this.sock = socket;
        this.sock.on('error', (e) => {
          console.log(e);
        });
        this.sock.on('user', (user) => {
          console.log(JSON.parse(user));
        });
        this.sock.send(JSON.stringify({action: 10, channel: 'user:' + user}));
        this.sock.on('message', (msg) => {
          msg = JSON.parse(msg);
          switch (msg.action) {
            case 15:
              console.log(msg);
              if (msg.message.name == 'chat-message') {
                msg = JSON.parse(msg.message.data);
                EventEmitter.emit('chat', msg);
              }
              if (msg.message.name == 'new-message') {
                msg = JSON.parse(msg.message.data);
                EventEmitter.emit('pm', msg);
              }
              if (msg.message.name == 'room_playlist-update') {
                msg = JSON.parse(msg.message.data);
                EventEmitter.emit('newSong', msg);
                console.log(msg);
              }
              break;
            default:
              console.log('fallthrough', msg);
          }
        })
      });
  }

  connectUser(id) {
    this.sock.send(JSON.stringify({action: 10, channel: 'user:' + id}));
  }

  join(id) {
    // if (this.user) {
    //   this.sock.send(JSON.stringify({action: 10, channel: 'user:' + this.user}));
    // }
    // this.sock.send(JSON.stringify({action: 10, channel: 'user:5876ef8384d754ae0091dedb'}));
    this.sock.send(JSON.stringify({action: 10, channel: 'room:' + id}));
    this.sock.send(JSON.stringify({action: 14, channel:'room:' + id, presence: {action: 0, data: {}}}));
  }
}
