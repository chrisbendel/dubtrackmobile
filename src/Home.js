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
  ScrollView,
  RefreshControl,
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
import {Container, Header, Title, Left, Right, Body, Button, Icon, Content} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let {height, width} = Dimensions.get('window');

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
    app.user.setSocket()
      .then(() => {
        app.user.socket.on('message', function (msg) {
          msg = JSON.parse(msg);
          console.log(msg);
        })
      });
  }

  componentDidMount() {
    this.loadData();
    // app.user.socket.on('message', function (msg) {
    //   msg = JSON.parse(msg);
    //   console.log(msg);
    // })
  }

  componentWillMount() {

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
    let that = this;
    return (
      <View style={{flex: 1}}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => Actions.refresh({key: 'menu', open: value => !value})}>
                <Icon size={30} name={'ios-menu'}>
                </Icon>
              </Button>
            </Left>
            <Body>
              <Title>Lobby</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => Actions.refresh({key: 'messages', open: value => !value})}>
                <Icon size={30} name={'ios-mail-open'}/>
              </Button>
            </Right>
          </Header>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
            <Spinner overlayColor='rgba(0,0,0,0.2)' color="#4a8bfc" visible={this.state.loading}/>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </Content>
        </Container>
        <View style={styles.searchContainer}>
          <TextInput
            ref={'search'}
            style={styles.searchBar}
            inlineLabel
            placeholder='Search'
            placeholderTextColor={'black'}
            returnKeyType="search"
            returnKeyLabel="search"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(roomSearch) => this.setState({roomSearch})}
            onSubmitEditing={() => {
              this.loadData(this.state.roomSearch);
              that.refs['search'].clear();
            }}/>
          <KeyboardSpacer/>
        </View>
      </View>
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
              style={{width: width * .97, height: 150}}
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
    app.user.joinRoom(rowData._id);
    Actions.room({room: rowData});
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#4a8bfc',
    borderStyle: 'solid',
    backgroundColor: '#4a8bfc',
  },
  searchBar: {
    height: 40,
    textAlign: 'center',
  },
  rowTitle: {
    color: '#333333',
    fontSize: 18,
  },
});
