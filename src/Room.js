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

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
    }
  }

  componentWillMount() {
    this.props.api.disconnect();
    this.props.api.connect(this.props.roomId)
      .then(room => {
        this.setState({room});
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.roomTitle}> {this.state.room.name} </Text>
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
