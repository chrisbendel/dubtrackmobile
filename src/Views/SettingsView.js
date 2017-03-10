import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput
} from 'react-native';

// import {Drawer} from 'native-base';
// import {Actions} from 'react-native-router-flux'
import Logout from './LogoutView';
import Login from './LoginView';
import FullSpinner from './FullSpinnerView';
import {Container, Header, Title, Left, Right, Body, Button, Footer, FooterTab, Icon, Content, Thumbnail, Spinner} from 'native-base';
import app from '../app';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    console.log('seetings view:', app.user);
    // console.log(app.user.user.info.profileImage.url);

    this.state = {
      loggedIn: app.user.loggedIn,
      loading: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.loading = this.loading.bind(this);
  }

  updateUser(e) {
    //called by child to update the state
    e && e.preventDefault();
    if (app.user.loggedIn) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }
    console.log('settings loggedIn state:', this.state.loggedIn);
  }

  loading(isloading = true) {
    isloading ? this.setState({loading: true}) : this.setState({loading: false});
  }


  render() {
    return (
    <Container>
      {this.state.loading ?
        <FullSpinner/>
        :
          this.state.loggedIn ?
            <Logout updateUser = {this.updateUser} loading = {this.loading}/> :
            <Login updateUser = {this.updateUser} loading = {this.loading}/>
      }
      </Container>
    );
  }
}
