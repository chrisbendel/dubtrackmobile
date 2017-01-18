'use strict';

var EngineIOClient = require('react-native-engine.io-client');

var DubAPIRequestError = require('./errors/requestError.js');

var utils = require('./utils.js');

var endpoints = require('./data/endpoints.js');

function SocketHandler(dubAPI) {
  this._ = {};
  this._.dubAPI = dubAPI;
  this._.socket = null;
  this._.channels = {};
  this._.reconnect = true;

  this.connectBind = utils.bind(this.connect, this);
  this.onOpenBind = utils.bind(this.onOpen, this);
  this.onMessageBind = utils.bind(this.onMessage, this);
  this.onErrorBind = utils.bind(this.onError, this);
  this.onCloseBind = utils.bind(this.onClose, this);
}
SocketHandler.prototype.connect = async function () {
  fetch('https://api.dubtrack.fm/auth/token')
    .then((res) => res.json())
    .then((json) => {
      if (json.code !== 200) {
        // this._.dubAPI.emit('error', new DubAPIRequestError(code, that._.dubAPI._.reqHandler.endpoint(endpoints.authToken)));
        setTimeout(that.connectBind, 5000);
        return;
      }

      this._.socket = new EngineIOClient({
        hostname: 'ws.dubtrack.fm',
        secure: true,
        path: '/ws',
        query: {access_token: json.data.token},
        transports: ['websocket']
      });
    })
    .catch(() => {
      console.log('error');
    });
};

SocketHandler.prototype.onOpen = function () {
  var channels = Object.keys(this._.channels);

  for (var i = 0; i < channels.length; i++) {
    this._.socket.send(JSON.stringify({action: 10, channel: channels[i]}));
  }

  // this._.dubAPI.emit('socket:open');
};

SocketHandler.prototype.onMessage = function (data) {
  try {
    data = JSON.parse(data);
  } catch (err) {
    this._.dubAPI.emit('error', err);
    return;
  }

  // this._.dubAPI.emit('socket:message', data);

  if (data.action === 15 && this._.channels[data.channel]) {
    try {
      data.message.data = JSON.parse(data.message.data);
    } catch (err) {
      // this._.dubAPI.emit('error', err);
      return;
    }

    this._.channels[data.channel](data.message.data);
  }
};

SocketHandler.prototype.onError = function (err) {
  this._.dubAPI.emit('error', err);
};

SocketHandler.prototype.onClose = function () {
  this._.socket = undefined;

  if (this._.reconnect) setTimeout(this.connectBind, 5000);

  this._.dubAPI.emit('socket:close');
};

SocketHandler.prototype.attachChannel = function (channel, callback) {
  if (this._.socket && !this._.channels[channel]) this._.socket.send(JSON.stringify({action: 10, channel: channel}));

  this._.channels[channel] = callback;
};

SocketHandler.prototype.detachChannel = function (channel) {
  if (this._.socket && this._.channels[channel]) this._.socket.send(JSON.stringify({action: 12, channel: channel}));

  delete this._.channels[channel];
};

SocketHandler.prototype.disconnect = function () {
  if (!this._.socket) return;

  this._.reconnect = false;
  this._.socket.close();
};

module.exports = SocketHandler;
