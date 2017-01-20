'use strict';

class Protocol {
  constructor() {
    this.account = new (require('./account.js'))(this.request);
    this.user = new (require('./user.js'))(this.request);
    this.playlist = new (require('./playlist.js'))(this.request);
    this.room = new (require('./room.js'))(this.request);
    this.song = new (require('./song.js'))(this.request);
    this.pm = new (require('./privatemessages.js'))(this.request);
  }
}

module.exports = Protocol;
