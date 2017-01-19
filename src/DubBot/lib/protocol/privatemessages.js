'use strict';

class PMProtocol {
  constructor(request) {
    this.request = request;
  }

  list(callback) {
    this.request({
      method: 'GET',
      url: 'message'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  checkNew(callback) {
    this.request({
      method: 'GET',
      url: 'message/new'
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  messages(converid, callback) {
    this.request({
      method: 'GET',
      url: 'message/' + converid
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  get(usersid, callback) {
    if (usersid.constructor === String) {
      usersid = [usersid];
    }

    if (usersid.length > 10) {
      console.log("[Protocol] pm.get conversations are up to 10 people.");
      return;
    }

    this.request({
      method: 'POST',
      url: 'message',
      form: {
        'usersid': usersid
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  send(converid, message, callback) {
    this.request({
      method: 'POST',
      url: 'message/' + converid,
      form: {
        message: message,
        time: Date.now()
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }

  read(converid, callback) {
    this.request({
      method: 'POST',
      url: 'message/' + converid + "/read"
    }, function (error, response, body) {
      if (callback != undefined) callback(body.data);
    });
  }
}

module.exports = PMProtocol;
