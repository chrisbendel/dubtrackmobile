import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Button,
  TextInput
} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            console.log('pressed');
          }}
          title="Login"
        />
        <Text> Settings </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  rowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowTitle: {
    color: '#333333',
    fontSize: 18,
  },
});
