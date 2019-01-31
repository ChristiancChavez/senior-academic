import React, { Component, Fragment } from 'react';
import firebase from '../../firebase';
import {storage} from '../../firebase';

class Form extends Component {
  state = {
    name: "",
    age: "",
    email: "",
    users: [],
    submitted: false,
    error: false, 
    image: null,
    url: '',
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

  handleChangeImage = e => {
    if(e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
    (snapshot) => {

    }, 
    (error) => {
      console.log(error);
    },
    () => {
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        console.log(url);
        this.setState({
          url 
        })
      })
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
    const { name, age, email, submitted, error, url } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleOnSubmit}>
          <input value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Put your name here"/>
          <input value={age} onChange={this.handleOnChange} type="number" name="age" placeholder="What's your age"/>
          <input value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="What's your email"/>
          <input type="file" onChange={this.handleChangeImage}/>
          <img src={url} alt="uploaded images" height="300px" width="400px"/>
          <input type="submit" placeholder="Submit" onClick={this.handleUpload}/>
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