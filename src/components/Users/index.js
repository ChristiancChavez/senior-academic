import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import User from './User';


class Users extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const usersRef = firebase.database().ref('users');

    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();

      if (users) {
        const newState = Object.keys(users).map(user => ({
          id: user,
          name: users[user].name,
          age: users[user].age,
          email: users[user].email
        }));

        this.setState({
          users: newState
        });
      }
    });
  }

  renderUsers = users => (
    <ul>
      <h1>LIST OF USERS</h1>
      {users.map((user, key) => (
        <li key={key}>
          <Link to={`users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  )

  renderUserInfo = info => {
    return(
      <div>
      {info.map(each => (
          <User info={each} key={each.id} />
        )
      )}
      </div>
  )
};

  render() {
    const { users } = this.state;
    const { match: { params: { userId } } } = this.props;
    let selectedUser = false;
    
    if (userId) {
      selectedUser = users.filter(user => user.id === userId);
    }
    
    return( 
      <div>
        {selectedUser ?
          this.renderUserInfo(selectedUser) :
          this.renderUsers(users) 
        }
      </div>
    );
  }
}

export default Users;