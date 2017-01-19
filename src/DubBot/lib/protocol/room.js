'use strict';

var base = 'https://api.dubtrack.fm/';
class RoomProtocol {
  constructor(request) {
    // this.get = function (endpoint) {
    //   return fetch('https://api.dubtrack.fm/' + endpoint)
    //     .then(res => res.json())
    //     .then(json => {
    //       return json;
    //     });
    // };

    this.queue = new (require('./room/queue.js'))(request);
    this.userQueue = new (require('./room/userqueue.js'))(request);
  }

  listPublic(callback) {

    this.request({
      method: 'GET',
      url: 'room'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  make(roomObject, callback) {
    this.request({
      method: 'POST',
      url: 'room',
      form: roomObject
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  update(roomObject, callback) {
    this.request({
      method: 'PUT',
      url: 'room',
      form: roomObject
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  info(room) {
    return fetch(base + 'room/' + room)
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  users(roomid, callback) {
    this.request({
      method: 'GET',
      url: 'room/' + roomid + '/users'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  muted(roomid, callback) {
    this.request({
      method: 'GET',
      url: 'room/' + roomid + '/users/mute'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  banned(roomid, callback) {
    this.request({
      method: 'GET',
      url: 'room/' + roomid + '/users/ban'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  userInfo(roomid, userid, callback) {
    this.request({
      method: 'GET',
      url: 'room/' + roomid + '/users/' + userid
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  /* Need to do more tests but feels buggy / shot down. (gave me a wierd internal error)
   leave(roomid, callback) {

   this.request({
   method: 'REMOVE',
   url: 'room/' + roomid + '/users'
   }, function(error, response, body){
   if (callback != undefined) callback(respons);
   });
   }
   //*/

  send(roomid, message, realTimeChannel, callback) {
    //TODO: rewrite this as fetch post
    this.request({
      method: 'POST',
      url: 'chat/' + roomid,
      form: {
        message: message,
        realTimeChannel: realTimeChannel,
        time: Date.now(),
        type: 'chat-message'
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  remove(roomid, msgid, callback) {
    this.request({
      method: 'DELETE',
      url: 'chat/' + roomid + '/' + msgid
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  kick(roomid, userid, realTimeChannel, message, callback) {
    if (message === undefined) {
      message = '';
    } else if (message.constructor === Function) {
      callback = message;
      message = '';
    }

    this.request({
      method: 'POST',
      url: 'chat/kick/' + roomid + '/user/' + userid,
      form: {
        realTimeChannel: realTimeChannel,
        message: message
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  mute(roomid, userid, realTimeChannel, callback) {
    this.request({
      method: 'POST',
      url: 'chat/mute/' + roomid + '/user/' + userid,
      form: {
        realTimeChannel: realTimeChannel
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  unmute(roomid, userid, realTimeChannel, callback) {
    this.request({
      method: 'DELETE',
      url: 'chat/mute/' + roomid + '/user/' + userid,
      form: {
        realTimeChannel: realTimeChannel
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  ban(roomid, userid, realTimeChannel, time, callback) {
    if (time === undefined) {
      time = 0;
    } else if (time.constructor === Function) {
      callback = time;
      time = 0;
    }

    this.request({
      method: 'POST',
      url: 'chat/ban/' + roomid + '/user/' + userid,
      form: {
        realTimeChannel: realTimeChannel,
        time: time
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  unban(roomid, userid, realTimeChannel, callback) {
    this.request({
      method: 'DELETE',
      url: 'chat/ban/' + roomid + '/user/' + userid,
      form: {
        realTimeChannel: realTimeChannel
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  setRole(roomid, userid, roleid, callback) {
    this.request({
      method: 'POST',
      url: 'chat/' + roleid + '/' + roomid + '/user/' + userid
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  removeRole(roomid, userid, callback) {
    this.request({
      method: 'REMOVE',
      url: 'chat/0/' + roomid + '/user/' + userid
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

}

module.exports = RoomProtocol;
