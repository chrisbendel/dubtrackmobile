'use strict';

var base = 'https://api.dubtrack.fm/';

export default class UserQueue {
  constructor() {

  }

  list(roomid, callback) {
    return fetch(base + 'user/session/room' + roomid + '/queue')
      .then(res => res.json())
      .then(json => {
        console.log('json from userqueue list');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  add(roomid, type, fkid, callback) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'songType': type,
        'songId': fkid
      })
    };

    return fetch(base + 'room/' + roomid + '/playlist', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json from userqueue add');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  remove(roomid, songid, callback) {
    let obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'room/' + roomid + '/playlist/' + songid, obj)
      .then(res => res.json())
      .then(json => {
        console.log('json from userqueue remove');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //TODO: finish functions from here down
  // removeAll(roomid, callback) {
  //   this.request({
  //     method: 'GET',
  //     url: 'room/' + roomid + '/playlist'
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // order(roomid, idArray, callback) {
  //   this.request({
  //     method: 'POST',
  //     url: 'room/' + roomid + '/queue/order',
  //     form: {
  //       'order[]': idArray
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // pauseState(roomid, paused, callback) {
  //   this.request({
  //     method: 'PUT',
  //     url: 'room/' + roomid + '/queue/pause',
  //     form: {
  //       pause: paused ? '1' : '0'
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // joinRoomQueue(roomid, callback) {
  //   pauseState(roomid, false, callback);
  // }
  //
  // leaveRoomQueue(roomid, callback) {
  //   pauseState(roomid, true, callback);
  // }
}

