import Queue from './queue';

const base = 'https://api.dubtrack.fm/';
export default class Room {
  constructor() {
    this.users = [];
    this.queue = new Queue();
    this.info = null;
  }

  setupRoom(id) {
    return this.joinRoom(id)
      .then(() => {
        return this.getRoomInfo(id);
      })
      .then(() => {
        return this.getRoomUsers(id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getUserInfo(room, user) {
    return fetch(base + 'room/' + room + '/users/' + user)
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //<----- Room admin methods ----->

  //Room muted/banned users
  //Not sure if server side logic will prevent
  //a banned user from joining or need to use these
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

  //<----- Room creation methods - Create room, update room info, delete room, etc ----->
  makeRoom(roomObject) {
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
