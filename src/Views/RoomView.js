import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import GiftedChat from 'react-native-gifted-chat';
import {
  Container,
  Body,
  Tab,
  Icon,
  List,
  Left,
  Right,
  TabHeading,
  Content,
} from 'native-base';
import app from './../app';

export default class RoomView extends Component {
  constructor(props) {
    super(props);
    console.log(app.user);
    this.state = {
      messages: [],
      message: '',
      users: [],
      listViewPaddingTop: 0
    };
    // this.setChatListener();
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  // setChatListener() {
  //   app.user.socket.on('message', (msg) => {
  //     //New messages are sent over socket
  //     //TODO: Need to connect to the base socket on app open
  //     //TODO: but only connect to the room here
  //     msg = JSON.parse(msg);
  //     switch (msg.action) {
  //       case 15:
  //         console.log(msg);
  //         if (msg.message.name == 'chat-message') {
  //           msg = JSON.parse(msg.message.data);
  //           app.user.getRoomUser(app.user.room.info._id, msg.user._id)
  //             .then(user => {
  //               msg['avatar'] = user._user.profileImage.secure_url;
  //               return this.setState(previousState => ({
  //                 messages: [...previousState.messages, msg]
  //               }));
  //             })
  //             .catch(e => {
  //               console.log(e);
  //             });
  //         }
  //         break;
  //       case 14:
  //
  //         break;
  //       default:
  //     }
  //   });
  // }

  render() {
    return (
      <Container>
        <View>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
          />
        </View>
      </Container>
      // <Container>
      //   <Content>
      //     <View style={{height: height * .7}}>
      //       <InvertibleScrollView inverted
      //                             onContentSizeChange={ () => {
      //                               this.messageList.scrollTo({y: 0})
      //                             }}
      //                             ref={(messageList) => {
      //                               this.messageList = messageList
      //                             }}>
      //         <List dataArray={this.state.messages}
      //               renderRow={(message) =>
      //                 <ListItem
      //                   style={{borderBottomWidth: 0}}
      //                 >
      //                   <Thumbnail circle size={30} source={{uri: message.avatar}}/>
      //                   <Text style={{fontWeight: 'bold'}}>{message.user.username}</Text>
      //                   <Text>{message.message}</Text>
      //                 </ListItem>
      //               }>
      //         </List>
      //       </InvertibleScrollView>
      //     </View>
      //   </Content>
      // </Container>
      // <View style={styles.chatContainer}>
      //   <TextInput
      //     ref={'chat'}
      //     style={styles.chatBar}
      //     autoCorrect={false}
      //     placeholderTextColor={'black'}
      //     placeholder="Send chat message"
      //     returnKeyType='send'
      //     returnKeyLabel='send'
      //     onChangeText={(message) => this.setState({message})}
      //     onSubmitEditing={() => {
      //       app.user.chat(this.state.message);
      //       that.refs['chat'].clear();
      //       this.setState({message: ''});
      //     }}/>
      //   <KeyboardSpacer/>
      // </View>
    );
  }
}
