// This file contains all the possible calls to the dubtrack API made function.
// Take a look at the wiki for more information


'use strict';

//base request which the otheres are made of
// const _request = require('request');


// const typeCheck = require('./../utils/typeCheck.js');
// const errorCheck = require('./../utils/errorcheck.js');

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
