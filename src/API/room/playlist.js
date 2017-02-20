'use strict';

var base = 'https://api.dubtrack.fm/';

class PlaylistProtocol {
  constructor() {
  }

  list() {
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

  make(name) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'name': name
      })
    };

    return fetch(base + 'playlist', obj)
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  }

  remove(playlistid) {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };
    return fetch(base + 'playlist/' + playlistid, obj)
      .catch(e => {
        console.log(e);
      })
  }

  //TODO: might need pages to acces larger playlists
  songs(playlistid, page, name) {
    return fetch(base + 'playlist/' + playlistid + '/songs')
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addSong(playlistid, type, fkid, callback) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'type': type,
        'fkid': fkid,
      })
    };

    return fetch(base + 'playlist/' + playlistid + '/songs', obj)
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeSong(playlistid, songid, callback) {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'playlist/' + playlistid + '/songs/' + songid)
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.log(e)
      });
  }
}

module.exports = PlaylistProtocol;
