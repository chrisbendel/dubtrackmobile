'use strict';

const Room = require('./room.js');

class RoomList {
  constructor(dubbot) {
    this.dubbot = dubbot;
    this.rooms = {};
    this.toJoin = [];
  }

  add(room) {
    let r = new Room(room, this.dubbot);
    if (this.dubbot.connected) {
      this._joinRoom(r);
    } else {
      this.toJoin.push(r);
    }
    return r;
  }

  _joinRoom(room) {
    let that = this;
    this.dubbot.protocol.room.info(room._ref)
      .then(res => {
        let data = res.data;
        let id = data._id;
        room._join(id, data.realTimeChannel);
        that.rooms[id] = room;
        // if (that.rooms[id] === undefined) {
        //   that.rooms[id] = room;
        //   room._join(id, data.realTimeChannel);
        // }
      })
      .catch(e => {
        console.log(e);
      });
  }

  _joinRooms() {
    if (!this.dubbot.connected) return;

    for (let room of this.toJoin) {
      this._joinRoom(room);
    }
    this.toJoin.length = 0;
  }
}

module.exports = RoomList;
