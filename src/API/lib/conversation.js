class Conversation {
  constructor() {
    this.id = data._id;
    this.usersid = data.usersid;
    this.clearTimer = undefined;

    this.update(data);
  }

  send(message) {
    this.dubbot.protocol.pm.send(this.id, message);
  }

  update(data) {
    clearTimeout(this.clearTimer);

    this.isNew = (data.created == data.latest_message);
    this.lastestMessage = data.latest_message_str;
    if (this.lastestMessage === undefined) {
      this.lastestMessage = "";
    }

    let that = this;
    this.clearTimer = setTimeout(function () {
      that.clear();
    }, that.clearTime);
  }

  //this is called after a time without using this object. It prevents the usage of memory forever.
  clear() {
    delete this.dubbot.pm._byUsers[this.usersid];
    delete this.dubbot.pm._current[this.id];
  }

  toString() {
    return this.lastestMessage;
  }
}

module.exports = Conversation;
