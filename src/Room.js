GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Tabs from 'react-native-tabs';
import app from './app';

export default class Room extends Component {
  constructor(props) {
    super(props);
    // console.log(app.bot);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      room: {},
      self: {},
      // self: this.props.api._.self,
      dataSource: ds.cloneWithRows([]),
    };
    // var room = bot.join('dubtrackmobile');
    // console.log(room);
  }

  componentWillMount() {
    // let testchat = ['1', '2', '3', '4'];
    // this.props.api.disconnect();
    // this.props.api.connect(this.props.roomId)
    //   .then(room => {
    //     this.setState({
    //       room: room,
    //       dataSource: this.state.dataSource.cloneWithRows(testchat)
    //     });
    //     this.props.api.sendChat('hello');
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     Promise.reject(e);
    //   });
  }

  // postChat() {
  //   let postChat = {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       message: 'hello',
  //       time: '1484697600',
  //       realTimeChannel: this.state.room.realTimeChannel,
  //       type: 'chat-message',
  //       user: this.state.self
  //     })
  //   };
  //   return fetch('https://api.dubtrack/fm/chat/' + this.state.room.id, postChat)
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

//TODO: render each chat message in a row
  renderRow(rowData) {
    return (
      <View>
        <Text>Chat message</Text>
      </View>
    );
  }


  render() {
    return (
      //TODO: maybe put in a before and after updub image
      <View style={styles.container}>
        <Text style={styles.roomTitle}> {this.state.room.name} </Text>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
        <Tabs>
          <Text name="queue">queue</Text>
          <Text name="heart">heart</Text>
          <Text name="up">up</Text>
          <Text name="down">down</Text>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
