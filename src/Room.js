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

export default class Room extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      room: {},
      dataSource: ds.cloneWithRows([]),
    };
    this.loadChat();
  }

  loadChat() {
    return this.props.api.getChatHistory();
  }

  componentWillMount() {
    let testchat = ['1', '2', '3', '4'];
    this.props.api.disconnect();
    this.props.api.connect(this.props.roomId)
      .then(room => {
        let chat = this.props.api.getChatHistory();
        this.setState({
          room: room,
          dataSource: this.state.dataSource.cloneWithRows(testchat)
        });
      })
      .catch(e => {
        console.log('err ' + e);
        Promise.reject(e);
      });

  }

  renderRow(rowData) {
    return (
      <View>
        <Text>Chat message</Text>
      </View>
    );
  }


  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.roomTitle}> {this.state.room.name} </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
        <Tabs>
          <Text name="queue" onPress={( this.props.api.sendChat('hi this is a test from the mobile app'))}>queue</Text>
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
  },
  roomTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
