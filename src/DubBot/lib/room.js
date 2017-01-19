'use strict';

var EngineIOClient = require('react-native-engine.io-client');
import EventEmitter from 'EventEmitter';
// const EventEmitter = require('EventEmitter');
const pubnub = require('pubnub');

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

//TODO: this class might need to have a socket library added to connect to websocket

class Room extends EventEmitter {
  constructor(ref, dubbot) {
    super();

    this.dubbot = dubbot;
    this.emitter = new EventEmitter();
    this._ref = ref;
    this.id = '';
    this.realTimeChannel = '';
    this._pubnub = undefined;
    this.socket = null;

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

  _join(id, realTimeChannel) {
    this.id = id;
    this.realTimeChannel = realTimeChannel;

    this.socket = new EngineIOClient({
      hostname: 'ws.dubtrack.fm',
      secure: true,
      path: '/ws',
      transports: ['websocket']
    });

    //TODO: remove old pubnub requests when engineioclient works
    // this._pubnub = pubnub({
    //   backfill: false,
    //   restore: false,
    //   subscribe_key: 'sub-c-2b40f72a-6b59-11e3-ab46-02ee2ddab7fe',
    //   ssl: true,
    //   uuid: this.dubbot.id
    //
    // });
    // let that = this;
    //For some reason pubnub changes the this in the callback -.-'
    // this._pubnub.subscribe({
    //   channel: that.realTimeChannel,
    //   connect: function () {
    //     that.emit('connect');
    //   },
    //   disconnect: function () {
    //     that.emit('disconnect');
    //   },
    //   message: function () {
    //     that._onmessage.apply(that, arguments);
    //   },
    //   error: console.error
    // });
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
