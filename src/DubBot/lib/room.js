'use strict';

var EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from 'EventEmitter';

const User = require('./user.js');
const Song = require('./song.js');
const Message = require('./message.js');
const CommandList = require('./commandlist.js');
const _globalCD = require('./globalcd.js');

class NotACommandError {
  constructor(fake, where) {
    this.message =
      "Tried to add command at " + where + " without starting with exclamation mark (!) at the start (" + fake + ")";
    this.type = "NotACommandError";
    this.where = where;
  }

  toString() {
    return "[" + this.type + "] " + this.message;
  }
}

class Room extends EventEmitter {
  constructor(ref, dubbot) {
    super();

    this.dubbot = dubbot;
    this.emitter = new EventEmitter();
    this._ref = ref;
    this.id = '';
    this.realTimeChannel = '';

    this.currentSong = undefined;

    this._commands = new CommandList();
    this._globalCD = new _globalCD();

    this.users = {};
  }

  addCommand(name, cd, callback) {
    name = name.split(/\s+/g)[0];
    if (name.charAt(0) != '!') {
      throw NotACommandError(name, "[Room] addCommand");
    }

    if (cd.constructor === Function) {
      callback = cd;
      cd = 0;
    }

    this._commands.add(name, cd * 1000, callback);
  }

  addCommandAlias(original, alias) {
    this._commands.alias(original, alias);
  }

  removeCommand(name) {
    return this._commands.remove(name);
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

  say(message) {
    this.dubbot.protocol.room.send(this.id, message, this.realTimeChannel);
  }

  setSocket(token) {
    this.dubbot.socket = new EngineIOClient({
      hostname: 'ws.dubtrack.fm',
      secure: true,
      path: '/ws',
      query: {access_token: token},
      transports: ['websocket']
    });
    //socket listeners
    this.dubbot.socket.on('open', function () {
      console.log('socket open');
    });
    this.dubbot.socket.on('message', function (msg) {
      console.log('socket message');
      console.log(JSON.parse(msg));
    });
    this.dubbot.socket.on('close', function () {
      console.log('socket closed');
    });
    this.dubbot.socket.on('error', function () {
      console.log('socket error');
    });
    return this.dubbot.socket;
  }

  _join(id, realTimeChannel) {
    this.id = id;
    this.realTimeChannel = realTimeChannel;

    return fetch('https://api.dubtrack.fm/auth/token')
      .then((res) => res.json())
      .then((json) => {
        return this.setSocket(json.data.token);
      })
      .then(() => {
        this.dubbot.socket.send(JSON.stringify({
          action: 15,
          channel: 'room:55f8353d44809b0300f88699',
          serverId: 'd34a1cf7ec7d3409fd5e7a4ad15a288b'
        }));
        // this.dubbot.socket.send(JSON.stringify({action: 14, channel: 'room:55f8353d44809b0300f88699'}));
      })
      .catch(() => {
        console.log('error');
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

  toString() {
    return this._ref;
  }

}

module.exports = Room;
