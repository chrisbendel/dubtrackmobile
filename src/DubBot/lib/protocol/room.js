'use strict';

var base = 'https://api.dubtrack.fm/';
class RoomProtocol {
  constructor() {
    this.queue = new (require('./room/queue.js'));
    this.userQueue = new (require('./room/userqueue.js'));
  }

  make(roomObject) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'roomObject': roomObject
      })
    };

    return fetch(base + 'room', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.make()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e)
      });
  }

  update(roomObject) {
    let obj = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'roomObject': roomObject
      })
    };

    return fetch(base + 'room', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.update()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e)
      });
  }

  muted(roomid) {
    return fetch(base + 'room/' + roomid + '/users/mute')
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.muted()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  banned(roomid) {
    return fetch(base + 'room/' + roomid + '/users/ban')
      .then(res => res.json())
      .then(json => {
        console.log('json inside room.banned()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //TODO: rewrite all of these ****BORING*****

  // ***Need to do more tests but feels buggy / shot down. (gave me a wierd internal error)
  // leave(roomid, callback) {
  //   this.request({
  //     method: 'REMOVE',
  //     url: 'room/' + roomid + '/users'
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(respons);
  //   });
  // }
  // remove(roomid, msgid) {
  //   this.request({
  //     method: 'DELETE',
  //     url: 'chat/' + roomid + '/' + msgid
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // kick(roomid, userid, realTimeChannel, message, callback) {
  //   if (message === undefined) {
  //     message = '';
  //   } else if (message.constructor === Function) {
  //     callback = message;
  //     message = '';
  //   }
  //
  //   this.request({
  //     method: 'POST',
  //     url: 'chat/kick/' + roomid + '/user/' + userid,
  //     form: {
  //       realTimeChannel: realTimeChannel,
  //       message: message
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // mute(roomid, userid, realTimeChannel, callback) {
  //   this.request({
  //     method: 'POST',
  //     url: 'chat/mute/' + roomid + '/user/' + userid,
  //     form: {
  //       realTimeChannel: realTimeChannel
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // unmute(roomid, userid, realTimeChannel, callback) {
  //   this.request({
  //     method: 'DELETE',
  //     url: 'chat/mute/' + roomid + '/user/' + userid,
  //     form: {
  //       realTimeChannel: realTimeChannel
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // ban(roomid, userid, realTimeChannel, time, callback) {
  //   if (time === undefined) {
  //     time = 0;
  //   } else if (time.constructor === Function) {
  //     callback = time;
  //     time = 0;
  //   }
  //
  //   this.request({
  //     method: 'POST',
  //     url: 'chat/ban/' + roomid + '/user/' + userid,
  //     form: {
  //       realTimeChannel: realTimeChannel,
  //       time: time
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // unban(roomid, userid, realTimeChannel, callback) {
  //   this.request({
  //     method: 'DELETE',
  //     url: 'chat/ban/' + roomid + '/user/' + userid,
  //     form: {
  //       realTimeChannel: realTimeChannel
  //     }
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }
  //
  // setRole(roomid, userid, roleid, callback) {
  //   this.request({
  //     method: 'POST',
  //     url: 'chat/' + roleid + '/' + roomid + '/user/' + userid
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body.data);
  //   });
  // }
  //
  // removeRole(roomid, userid, callback) {
  //   this.request({
  //     method: 'REMOVE',
  //     url: 'chat/0/' + roomid + '/user/' + userid
  //   }, function (error, response, body) {
  //     if (callback != undefined) callback(body);
  //   });
  // }

}

module.exports = RoomProtocol;
