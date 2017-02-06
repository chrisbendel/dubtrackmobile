var base = 'https://api.dubtrack.fm/';

class PMProtocol {
  constructor() {

  }

  list() {
    return fetch(base + 'message')
      .then(res => res.json())
      .then(json => {
        console.log('json inside pm.list()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  checkNew() {
    return fetch(base + 'message/new')
      .then(res => res.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  messages(converid) {
    return fetch(base + 'message/' + converid)
      .then(res => res.json())
      .then(json => {
        console.log('json inside pm.messages()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  get(usersid) {
    if (usersid.constructor === String) {
      usersid = [usersid];
    }

    if (usersid.length > 10) {
      console.log("[Protocol] pm.get conversations are up to 10 people.");
      return;
    }

    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'usersid': usersid
      })
    };

    return fetch(base + 'message', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside pm.get()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  send(converid, message) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      },
      body: JSON.stringify({
        'message': message,
        'time': Date.now()
      })
    };

    return fetch(base + 'message/' + converid, obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside pm.send()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  read(converid) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'message/' + converid + '/read', obj)
      .then(res => res.json())
      .then(json => {
        console.log('json inside pm.read()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

module.exports = PMProtocol;
