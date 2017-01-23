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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  renderRow(rowData) {
    return (
      <View>
        <Text>Chat message</Text>
      </View>
    );
  }

  render() {
    return (
      //TODO: maybe put in icon before and after updub image
      <View style={styles.container}>
        <Text style={styles.roomTitle}> room name goes here </Text>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
        <Tabs>
          <Text name="queue" onPress={() => {
            app.bot.join(this.props.roomId);
          }}>join room</Text>
          <Text name="heart" onPress={() => {
            app.bot.protocol.account.logout();
          }}>logout</Text>
          <Text name="send" onPress={() => {
            console.log('todo send message using the api');
          }}>up</Text>
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
