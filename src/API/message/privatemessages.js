var base = 'https://api.dubtrack.fm/';

export default class PrivateMessages {
  constructor() {

  }

  listMessages() {
    return fetch(base + 'message')
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  checkNew() {
    return fetch(base + 'message/new')
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  getConversation(id) {
    return fetch(base + 'message/' + id)
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

  send(id, message) {
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

    return fetch(base + 'message/' + id, obj)
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

  get(usersid) {
    if (usersid.length > 10) {
      console.log("conversations are up to 10 people.");
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

  markAsRead(id) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'message/' + id + '/read', obj)
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
