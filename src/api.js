import React, {Component} from 'react';
import webSocket from './webSocket';

export default class api extends Component {
  function api(auth, callback) {
    if (typeof auth !== 'object') throw new TypeError('auth must be an object');
    if (typeof auth.username !== 'string') throw new TypeError('auth.username must be a string');
    if (typeof auth.password !== 'string') throw new TypeError('auth.password must be a string');
    if (typeof callback !== 'function') throw new TypeError('callback must be a function');

    this.connected = false;
    this.socket = new webSocket();

    this._.slug = undefined;
    this._.self = undefined;
    this._.room = undefined;

    this.mutedTriggerEvents = false;
    this.maxChatMessageSplits = 1;

    
  }
}
