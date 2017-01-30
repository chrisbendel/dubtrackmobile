GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Tabs from 'react-native-tabs';
import app from './app';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let {height, width} = Dimensions.get('window');

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      chat: app.user.room.chat,
      message: '',
    };
  }

  componentDidMount() {
    this.updateChat = setInterval(() => {
      this.setState({
        dataSource: ds.cloneWithRows(app.user.room.chat)
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateChat);
  }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <View style={styles.message}>
        <View>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{rowData.user.username}</Text>
        </View>
        <Text>{rowData.message}</Text>
      </View>
    );
  }

  render() {
    let that = this;
    return (
      //TODO: maybe put in icon before and after updub image
      <View style={styles.container}>
        <Text style={styles.roomTitle}>
          {this.props.room.name}
        </Text>
        <ListView
          style={styles.chat}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
        <TextInput
          ref={'chat'}
          style={styles.searchBar}
          autoCorrect={false}
          placeholder="Send chat message"
          returnKeyType='send'
          returnKeyLabel='send'
          onChangeText={(message) => this.setState({message})}
          onSubmitEditing={() => {
            app.user.chat(this.state.message);
            that.refs['chat'].clear();
            this.setState({message: ''});
          }}/>
        <KeyboardSpacer/>
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
    backgroundColor: '#A6A6A8',
  },
  roomTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  message: {
    width: width,
    borderWidth: 1,
    borderColor: 'black'
  },
  searchBar: {
    height: 30,
    borderColor: 'black',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    margin: 10,
  },
});
