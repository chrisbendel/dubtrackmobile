import React, {Component} from 'react';

import Logout from './Views/LogoutView';
import Login from './Views/LoginView';
import FullSpinner from './Views/FullSpinnerView';
import {Container} from 'native-base';
import {AsyncStorage} from 'react-native';
import app from './app';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
    this.loading = this.loading.bind(this);
  }

  componentWillMount() {
    this.auth();
  }

  auth() {
    AsyncStorage.multiGet(['username', 'id', 'avatar'])
      .then((data) => {
        // if (data[0][1]) {
          this.setState({
            username: data[0][1],
            userid: data[1][1],
            avatar: data[2][1],
          })
        // } else {
        //   this.setState({
        //     username: null,
        //     userid: null,
        //     avatar: null,
        //   })
        // }
      });
  }


  update(e) {
    e && e.preventDefault();
    this.auth();
    // this.setState({loggedIn: status});
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
          this.state.username ?
            <Logout
              name={this.state.username}
              id={this.state.userid}
              avatar={this.state.avatar}
              update={this.update.bind(this)}
              loading={this.loading}/> :
            <Login update={this.update.bind(this)} loading={this.loading}/>
      }
      </Container>
    );
  }
}
