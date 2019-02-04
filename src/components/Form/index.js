import React, { Component } from 'react';
import firebase from '../../firebase';
import Logo from '../Logo/index';
import Social from '../Social/index';
import circleTopRegister from '../../assets/images/circletopregister.png';
import circleRightRegister from '../../assets/images/circlerightregister.png';
import close from '../../assets/images/close.png';
import ellipseBottomRegister from '../../assets/images/ellipsebottomregister.png';
import ellipseTopRegister from '../../assets/images/ellipsetopregister.png';
import './form.scss';

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
      <div className="register">
        <Logo />
        <img className="register__close" src={close} alt ="button to close" />
        <img className="register__circletopregister" src={circleTopRegister} alt ="circletop" />
        <img className="register__circlerightregister" src={circleRightRegister} alt ="circleRightRegister" />
        <img className="register__ellipsetopregister" src={ellipseTopRegister} alt ="ellipseTopRegister" />
        <img className="register__ellipsebottomregister" src={ellipseBottomRegister} alt ="ellipseBottomRegister" />
        
        <div className="content">
          <h1 className="content__title">REGISTRO</h1>
          <p className="content__question">¿Deseas convertirte en un Senior de prestigio? Haz parte de nuestro próximo entrenamiento, registrarte y estaremos en contacto contigo</p>
        </div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="categorie">
            <span className="categorie__title">Nombre y Apellido</span>
            <input className="categorie__input" value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Escribe tu nombre"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Nombre y Apellido</span>
            <input className="categorie__input" value={age} onChange={this.handleOnChange} type="number" name="age" placeholder="Escribe tu nombre"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Nombre y Apellido</span>
            <input className="categorie__input" value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="Escribe tu nombre"/>
          </div>
          <input type="file" />
          <input type="submit" placeholder="Submit" />
        </form>
        <Social />
        
        {submitted ?
          <h1>Hola</h1> :
          null
        }

        {error ?
          <h1>Chao</h1> :
          null
        }
      </div>
    );
  }
}

export default Form;