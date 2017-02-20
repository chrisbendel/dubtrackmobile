'use strict';

import User from './../user/user';

class Song {
  constructor(data, room) {
    this.room = room;

    this.id = data.song._id;
    this.songid = data.songInfo._id;
    this.fkid = data.songInfo.fkid;
    this.type = data.songInfo.type;
    this.name = data.songInfo.name;
    this.sender = undefined;

    let that = this;
    this.dubbot.protocol.user.info(data.song.userid, function (data) {
      that.sender = new User(data, that.room, that.dubbot);
    })
  }

  skip() {
    this.dubbot.protocol.room.queue.skip(this.room.id, this.id);
  }

  updub() {
    this.dubbot.protocol.room.queue.vote(this.room.id, this.id, 'updub');
  }

  downdub() {
    this.dubbot.protocol.room.queue.vote(this.room.id, this.id, 'downdub');
  }

  toString() {
    return this.name;
  }

  getLink(callback) {
    if (this.type == 'youtube') {
      callback('http://youtu.be/' + this.fkid);
    } else if (this.type = 'soundcloud') {
      this.dubbot.protocol.song.link(this.songid, callback);
    }
  }

  search(type, name, nextPageToken) {
    if (nextPageToken !== undefined) {
      if (nextPageToken.constructor === Function) {
        nextPageToken = '';
      }
    } else {
      nextPageToken = '';
    }

    return fetch(base + 'song?name=' + name + '&type=' + type + '&details=1&nextPageToken=' + nextPageToken)
      .then(res => res.json())
      .then(json => {
        console.log('json inside song.search()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  info(song) {
    return fetch(base + 'song/' + song)
      .then(res => res.json())
      .then(json => {
        console.log('json inside song.info()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  link(songId) {
    return fetch(base + 'song/' + songId + '/redirect')
      .then(res => res.json())
      .then(json => {
        console.log('json inside song.link()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

module.exports = Song;
