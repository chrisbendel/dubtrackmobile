'use strict';

const base = 'https://api.dubtrack.fm/';

class SongProtocol {
  constructor() {
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

module.exports = SongProtocol;
