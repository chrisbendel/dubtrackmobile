'use strict';

var base = 'https://api.dubtrack.fm/';

class PlaylistProtocol {
  constructor() {
    // this.request = request;
  }

  list(callback) {
    return fetch(base + 'playlist')
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
        Promise.reject();
      });
  }

  make(name, callback) {

    this.request({
      method: 'POST',
      url: 'playlist',
      form: {
        name: name
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  remove(playlistid, callback) {

    this.request({
      method: 'DELETE',
      url: 'playlist/' + playlistid
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  songs(playlistid, page, name, callback) {

    if (name !== undefined && name.constructor === Function) {
      callback = name;
      name = undefined;
    }
    if (page !== undefined && page.constructor === Function) {
      callback = page;
      page = undefined;
    }


    this.request({
      method: 'GET',
      url: 'playlist/' + playlistid + '/songs',
      form: {
        page: (page ? page : ''),
        name: (name ? name : '')
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  addSong(playlistid, type, fkid, callback) {

    this.request({
      method: 'POST',
      url: '/playlist/' + playlistid + '/songs',
      form: {
        type: type,
        fkid: fkid
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  removeSong(playlistid, songid, callback) {

    this.request({
      method: 'DELETE',
      url: '/playlist/' + playlistid + '/songs/' + songid
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }
}

module.exports = PlaylistProtocol;
