import React, { Component } from 'react';
import firebase from '../firebase';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      user: "",
      age: "",
      email: "",
      items: [],
      submitted: false,
      error: false
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          user: items[item].user,
          age: items[item].age,
          email: items[item].email
        });
      }

      this.setState({
        items: newState
      });
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

    const itemsRef = firebase.database().ref('items');
    const item = {
      user: this.state.user,
      age: this.state.age,
      email: this.state.email
    }
    
    let a = false;
    const { email } = item;


    this.state.items.forEach(user => {
      if (user.email === email) {
        a = true
      }
    });

    if (a) {
      this.setState({
        error: true
      });
      return
    }

    itemsRef.push(item);


    this.setState({
      user: '',
      age: '',
      email: '',
      submitted: true
    });
  }
  
  render() {
    const { user, age, email, submitted, error } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleOnSubmit}>
          <input value={user} onChange={this.handleOnChange} type="text" name="user" placeholder="Put your name here"/>
          <input value={age} onChange={this.handleOnChange} type="number" name="age" placeholder="What's your age"/>
          <input value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="What's your email"/>
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
      </React.Fragment>
    );
  }
}

export default Form;