import React, {Component} from 'react';

export default class webSocket extends Component {
  constructor(props) {
    super(props);
    this.doLogin();
    this.webSocket();
  }

  doLogin() {
    fetch('https://api.dubtrack.fm/auth/dubtrack?username=ph1ve&password=topher1', {
      method: 'POST'
    });

    fetch('https://api.dubtrack.fm/auth/session')
      .then((res) => res.json())
      .then((json) => {
        console.log('auth sessions');
        console.log(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  webSocket() {
    fetch('https://api.dubtrack.fm/auth/token')
      .then((res) => res.json())
      .then((json) => {
        var token = json.data.token;
        this.socket = require('react-native-engine.io-client')
                ({
                  hostname: 'ws.dubtrack.fm',
                  secure: true,
                  path: '/ws',
                  transports: ['websocket'],
                  query: {access_token: token},
                });
       this.socket.on('open', function(){
         console.log('connected');
       });
       this.socket.on('message', function(data){
         console.log(data);
        //  alert('message');
       });
       this.socket.on('close', function(){
         console.log('closed');
       });
       console.log('socket');
       console.log(this.socket);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
