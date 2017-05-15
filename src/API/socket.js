let EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from "react-native-eventemitter";
import {AsyncStorage} from 'react-native';
export default class Socket {

  constructor() {
    this.user = null;

    EventEmitter.on('setSocketUser', (user) => {
      this.user = user;
    });

    this.create()
      .then((sock) => {
        this.sock = sock;
        this.sock.on('message', (msg) => {
          msg = JSON.parse(msg);
          switch (msg.action) {
            case 15:
              console.log(msg.message.name);
              if (msg.message.name == 'new-message') {
                console.log(msg.message.name);
                EventEmitter.emit('pm');
              }

              break;
            case 14:
              break;
            default:
              console.log('fallthrough', msg);
          }
          // msg = JSON.parse(msg);
          // console.log('top level message', msg);
          // msg = JSON.parse(msg.message);
          // console.log(msg);
          // switch (msg.action) {
          //   case 15:
          //     if (msg.message.name == 'chat-message') {
          //       msg = JSON.parse(msg.message.data);
          //       EventEmitter.emit('chat', msg);
          //       // msg = JSON.parse(msg.message.data);
          //     }
          //     if (msg.message.name == 'new-message') {
          //       msg = JSON.parse(msg.message.data);
          //       EventEmitter.emit('pm', msg);
          //     }
          //     if (msg.message.name == 'room_playlist-update') {
          //       msg = JSON.parse(msg.message.data);
          //       console.log(msg);
          //     }
          //     break;
          //   case 14:
          //
          //     break;
          //   default:
          // }
          // console.log(msg);
          // EventEmitter.emit('chat', (msg));
        })
      });
  }

  create() {
    return fetch('https://api.dubtrack.fm/auth/token')
      .then(res => res.json())
      .then(json => {
        return new EngineIOClient({
          hostname: 'ws.dubtrack.fm',
          secure: true,
          path: '/ws',
          query: {access_token: json.data.token},
          transports: ['websocket']
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  join(id) {
    if (this.user) {
      this.sock.send(JSON.stringify({action: 10, channel: 'user:' + this.user}));
    }
    this.sock.send(JSON.stringify({action: 10, channel: 'room:' + id}));
  }
}
