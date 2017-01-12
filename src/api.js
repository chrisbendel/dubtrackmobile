GLOBAL = require('../src/Globals');

//TODO: import models here
import room from './models/room';
import self from './models/self';
import user from './models/user';

import React, {Component} from 'react';
import webSocket from './webSocket';

export default class api extends Component {
  constructor(props) {
    super(props);
    this.startApi();
  }

  startApi(auth, callback) {
    console.log(auth);
    this.connected = false;
    this.socket = new webSocket();
    this.socket.doLogin();
    this.slug = undefined;
    this.self = undefined;
    this.room = undefined;

    this.mutedTriggerEvents = false;
    this.maxChatMessageSplits = 1;
  }

  joinRoom(slug) {
    console.log('this inside joinroom');
    console.log(this);
    this.slug = slug;
    fetch(GLOBAL.BASE_URL + 'room/' + slug)
      .then((res) => res.json())
      .then((json) => {
        console.log('res from connecttoroom');
        console.log(json.data);
      });
  }

}
