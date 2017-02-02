GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  Navigator,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  Menu
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import app from './app';
import {Actions} from 'react-native-router-flux'
import {Container, Header, Footer, InputGroup, Input, Title, Button, Icon, Content, FooterTab} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
let {height, width} = Dimensions.get('window');

import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Home extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      roomSearch: '',
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
      loading: false,
    };
    app.user.login('dubtrackmobile', 'insecure');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(room) {
    this.setState({loading: true});
    if (room) {
      return fetch('https://api.dubtrack.fm/room/term/' + room)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data)
          });
          this.setState({loading: false});
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      return fetch('https://api.dubtrack.fm/room')
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data),
            refreshing: false,
          });
          this.setState({loading: false});
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true});
    this.loadData();
  }


  //use command+shift+k to enable keyboard hardware on ios emulator to test search bar
  render() {
    return (
      <Container>
        <Header>
          <Button transparent>
            <Icon size={30} color={'#fff'} name={'ios-menu'}/>
          </Button>
          <Title>Lobby</Title>
          <Button transparent>
            <Icon size={30} color={'#fff'} name={'ios-mail'}/>
          </Button>
        </Header>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <Spinner visible={this.state.loading}/>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />

          <View style={styles.searchFooter}>
            <TextInput
              style={styles.searchBar}
              placeholder='Search'
              placeholderTextColor={'black'}
              multiline={true}
              returnKeyType="search"
              returnKeyLabel="search"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(roomSearch) => this.setState({roomSearch})}
              onSubmitEditing={() => {
                this.loadData(this.state.roomSearch)
              }}/>
          </View>
        </Content>
      </Container>
    );
  }

  renderRow(rowData) {
    let uri;

    if (rowData.background) {
      uri = rowData.background.secure_url;
    } else {
      uri = 'https://res.cloudinary.com/hhberclba/image/upload/c_fill,fl_lossy,f_auto,w_320,h_180/default.png';
    }

    return (
      <Card>
        <CardImage>
          <TouchableHighlight onPress={ () => this.pressRow(rowData)}>
            <Image
              style={{width: width, height: 150}}
              source={{uri: uri}}
            />
          </TouchableHighlight>
        </CardImage>
        <CardTitle>
          <Text style={styles.rowTitle}> {rowData.name} </Text>
        </CardTitle>
      </Card>
    );
  }

  pressRow(rowData) {
    console.log(app.user.room);
    let currentRoom = app.user.room;
    let roomToJoin = rowData._id;

    if (currentRoom) {
      if (currentRoom.info._id == roomToJoin) {
        Actions.room({room: rowData});
        return;
      } else {
        app.user.leaveRoom(currentRoom.info._id);
        app.user.joinRoom(roomToJoin);
        Actions.room({room: rowData});
        return;
      }
    } else {
      app.user.joinRoom(roomToJoin);
      Actions.room({room: rowData});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  roomList: {
    marginTop: 30,
  },
  searchFooter: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'relative',
  },
  searchBar: {
    height: 30,
    fontSize: 14,
    textAlign: 'center',
  },
  center: {
    zIndex: 2,
    top: 200,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
