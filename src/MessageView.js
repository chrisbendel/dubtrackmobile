import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import app from './app';

export default class MessageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Message view goes here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
