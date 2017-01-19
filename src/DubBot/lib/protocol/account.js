'use strict';

// const checkArgs = require('./../utils/typeCheck.js');
// const errorCheck = require('./../utils/errorcheck.js');
import errorCheck from './../utils/errorcheck';
import checkArgs from './../utils/typecheck';

var base = 'https://api.dubtrack.fm/';
class AccountProtocol {
  constructor(request) {
    this.request = request;
  }

  login(username, password, callback) {
    checkArgs(arguments, ['String', 'String', 'Function'], "[Protocol] login", 2);
    let login = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    };

    fetch('https://api.dubtrack.fm/auth/dubtrack', login)
      .catch(e => {
        console.log(e);
      });
  }

  logout(callback) {
    checkArgs(arguments, ['Function'], "[Protocol] logout");

    this.request({
      method: 'GET',
      url: 'auth/logout'
    }, function (error, response, body) {
      if (!errorCheck(error, response, body, "[Protocol] logout")) return;
      if (callback != undefined) callback();
    });
  }

  info(callback) {
    checkArgs(arguments, ['Function'], "[Protocol] getSessionInfo");

    fetch(base + 'auth/session')
      .then(res => res.json())
      .then(json => {
        if (!errorCheck(error, response, json, "[Protocol] getSessionInfo")) return;
        if (callback != undefined) callback(body ? json.data : undefined);
        console.log(json);
      })
      .catch(e => {
        console.log(e);
      })
  };

  // this.request({
  //   method: 'GET',
  //   url: 'auth/session'
  // }, function (error, response, body) {
  //   if (!errorCheck(error, response, body, "[Protocol] getSessionInfo")) return;
  //   if (callback != undefined) callback(body ? body.data : undefined);
  // });
}

module.exports = AccountProtocol;
