import React, { Component, Fragment } from 'react';
import firebase from '../../firebase';

class Form extends Component {
  state = {
    name: "",
    age: "",
    email: "",
    users: [],
    submitted: false,
    error: false
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

  handleOnChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name] : value
    });
  }

  handleOnSubmit = e => {
    e.preventDefault();

    const usersRef = firebase.database().ref('users');

    const { name, age, email } = this.state;
    const item = {
      name: name,
      age: age,
      email: email
    }
    
    let a = false;
  
    this.state.users.forEach(user => {
      if (user.email === item.email) {
        a = true
      }
    });

    if (a) {
      this.setState({
        error: true
      });
      return
    }

    usersRef.push(item);


    this.setState({
      name: '',
      age: '',
      email: '',
      submitted: true
    });
  }
  
  render() {
    const { name, age, email, submitted, error } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleOnSubmit}>
          <input value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Put your name here"/>
          <input value={age} onChange={this.handleOnChange} type="number" name="age" placeholder="What's your age"/>
          <input value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="What's your email"/>
          <input type="file" />
          <input type="submit" placeholder="Submit" />
        </form>
        
        {submitted ?
          <h1>Hola</h1> :
          null
        }

        {error ?
          <h1>Chao</h1> :
          null
        }
      </Fragment>
    );
  }
}

export default Form;