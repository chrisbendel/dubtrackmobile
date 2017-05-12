let EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from "react-native-eventemitter";

export default class Socket {

  constructor() {
    this.create().then((sock) => {
      this.sock = sock;
      this.sock.on('message', (msg) => {
        msg = JSON.parse(msg);
        EventEmitter.emit('chat', (msg));
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
    this.sock.send(JSON.stringify({action: 10, channel: 'room:' + id}));
  }
}
