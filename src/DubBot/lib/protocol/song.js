'use strict';

class SongProtocol {
  constructor(request) {
    this.request = request;
  }

  search(type, name, nextPageToken, callback) {
    if (nextPageToken !== undefined) {
      if (nextPageToken.constructor === Function) {
        callback = nextPageToken;
        nextPageToken = '';
      }
    } else {
      nextPageToken = '';
    }

    this.request({
      method: 'GET',
      url: 'song?name=' + name + '&type=' + type + '&details=1&nextPageToken=' + nextPageToken
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  info(song, callback) {
    this.request({
      method: 'GET',
      url: 'song/' + song
    }, function (error, response, body) {
      if (callback != undefined) callback(response);
    });
  }

  link(songId, callback) {
    this.request({
      method: 'GET',
      url: 'song/' + songId + '/redirect'
    }, function (error, response, body) {
      if (callback != undefined) callback(response.caseless.dict.location);
    });
  }
}

module.exports = SongProtocol;
