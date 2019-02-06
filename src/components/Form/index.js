import React, { Component, Fragment } from 'react';
import firebase, { storage } from '../../firebase';
import placeholder from '../../images/placeholder.jpg';

class Form extends Component {
  constructor() {
    super();
    
    this.state = {
      name: "",
      age: "",
      email: "",
      users: [],
      submitted: false,
      error: false, 
      image: null,
      url: placeholder,
    }
    
    this.form = React.createRef();
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
    storage.ref(`images/${image.name}`).put(image);

    const output = document.getElementById('output_image');

    output.src = placeholder;
  }

  handleOnSubmit = e => {
    e.preventDefault();

    this.form.current.reportValidity();

    
    const usersRef = firebase.database().ref('users');
    
    const { name, age, email, image } = this.state;
    const item = {
      name: name,
      age: age,
      email: email,
      image: image.name
    }
    
    let emailExists = false;
    
    this.state.users.forEach(user => {
      if (user.email === item.email) {
        emailExists = true
      }
    });
    
    if (emailExists) {
      this.setState({
        error: true
      });
      return
    }
    
    this.handleUpload();
    usersRef.push(item);
    
    this.setState({
      name: '',
      age: '',
      email: '',
      image: placeholder,
      submitted: true
    });
  }

  previewImage = (e) => {
    if(!e.target.files[0]) {
      const output = document.getElementById('output_image');
    
      output.src = placeholder;
      return
    };
    let reader = new FileReader();
    reader.onload = () => {
      const output = document.getElementById('output_image');
      output.src = reader.result
    }

    reader.readAsDataURL(e.target.files[0]);

    if(e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  
  render() {
    const { name, age, email, submitted, error, url } = this.state;

    return (
      <Fragment>
        <form ref={this.form} onSubmit={this.handleOnSubmit}>
          <input value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Put your name here" required />
          <input value={age} onChange={this.handleOnChange} type="number" name="age" placeholder="What's your age" required />
          <input value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="What's your email" required />
          <input type="file" accept="image/*" onChange={this.previewImage} required />
          <img src={url} id="output_image" alt="uploaded images" height="300px" width="400px" />
          <input type="submit" placeholder="Submit" />
        </form>
        
        {submitted ?
          <h1>Hola</h1> :
          null
        }

        {error ?
          <h1>The email {this.state.email} is already registered</h1> :
          null
        }
      </Fragment>
    );
  }
}

export default Form;