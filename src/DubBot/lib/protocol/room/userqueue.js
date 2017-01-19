'use strict';

class RoomUserQueueProtocol {
  constructor() {
  }

  list(roomid, callback) {
    this.request({
      method: 'GET',
      url: 'user/session/room/' + roomid + '/queue'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  add(roomid, type, fkid, callback) {
    this.request({
      method: 'POST',
      url: 'room/' + roomid + '/playlist',
      form: {
        songType: type,
        songId: fkid
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  remove(roomid, songid, callback) {
    this.request({
      method: 'DELETE',
      url: 'room/' + roomid + '/playlist/' + songid
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  removeAll(roomid, callback) {
    this.request({
      method: 'GET',
      url: 'room/' + roomid + '/playlist'
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  order(roomid, idArray, callback) {
    this.request({
      method: 'POST',
      url: 'room/' + roomid + '/queue/order',
      form: {
        'order[]': idArray
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

//TODO check
  pauseState(roomid, paused, callback) {
    this.request({
      method: 'PUT',
      url: 'room/' + roomid + '/queue/pause',
      form: {
        pause: paused ? '1' : '0'
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  joinRoomQueue(roomid, callback) {
    pauseState(roomid, false, callback);
  }

  leaveRoomQueue(roomid, callback) {
    pauseState(roomid, true, callback);
  }
}

module.exports = RoomUserQueueProtocol;
