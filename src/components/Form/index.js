import React, { Component, Fragment } from 'react';
import firebase, { storage } from '../../firebase';
import placeholder from '../../images/placeholder.jpg';

class Form extends Component {
  constructor() {
    super();
    
    this.state = {
      name: "",
      lastName: "",
      number: "",
      phone: "",
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
          lastName: users[user].lastName,
          number: users[user].age,
          email: users[user].email,
          phone: users[user].phone
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
    
    const { name, number, email, image, lastName, phone } = this.state;
    const item = {
      name: name,
      lastName: lastName,
      number: number,
      email: email,
      image: image.name,
      phone: phone
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
      lastName: '',
      number: '',
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
    const { name, number, email, submitted, error, url, lastName, phone } = this.state;

    return (
      <Fragment>
        <form ref={this.form} onSubmit={this.handleOnSubmit}>
          <input value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Escribe tu nombre" required />
          <input value={lastName} onChange={this.handleOnChange} type="text" name="lastName" placeholder="Escribe tu apellido" required />
          <input value={number} onChange={this.handleOnChange} type="number" name="number" placeholder="Escribe tu cédula" required />
          <input value={phone} onChange={this.handleOnChange} type="tel" name="phone" placeholder="Escribe tu telefono" />
          <input value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="Escribe tu correo" required />
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