import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import User from './User';
import logo from '../../assets/images/seniors-logo.png';
import './users.scss';


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
          last_name: users[user].last_name,
          email: users[user].email,
          day: users[user].day,
          month: users[user].month,
          year: users[user].year,
          city: users[user].city,
          pl_vision: users[user].pl_vision,
          personal_vision: users[user].personal_vision,
          image: users[user].image
        }));

        this.setState({
          users: newState
        });
      }
    });
  }

  renderUsers = users => (
    <ul className="users__list">
      <h1 className="users__title">Usuarios</h1>
      {users.map((user, key) => (
        <li className="users__user" key={key}>
          <Link to={`users/${user.id}`} style={{ color: "white", textDecoration: "none" }}>{user.name} {user.last_name}</Link>
        </li>
      ))}
    </ul>
  )

  renderUserInfo = info => {
    return(
      <ul className="users__list">
      {info.map(each => (
          <User info={each} key={each.id} />
        )
      )}
      </ul>
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
      <div className="users">
        <div className='mt-25'>
          <img className="logo" src={logo} alt="Senior Academic Logo" />
        </div>

        {selectedUser ?
          this.renderUserInfo(selectedUser) :
          this.renderUsers(users) 
        }
      </div>
    );
  }
}

export default Users;