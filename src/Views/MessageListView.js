import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import app from '../app';

//TODO: This file needs to hold the list view of each message
export default class MessageListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Message view goes here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
