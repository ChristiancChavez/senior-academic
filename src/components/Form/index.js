import React, { Component } from 'react';
import firebase from '../../firebase';
import Logo from '../Logo/index';
import Social from '../Social/index';
import Photo from '../Photo/index';
import pointsRegisterTop from '../../assets/images/pointsregistertop.png';
import pointsRightRegister from '../../assets/images/pointsrightregister.png';
import circleTopRegister from '../../assets/images/circletopregister.png';
import circleRightRegister from '../../assets/images/circlerightregister.png';
import close from '../../assets/images/close.png';
import ellipseBottomRegister from '../../assets/images/ellipsebottomregister.png';
import ellipseTopRegister from '../../assets/images/ellipsetopregister.png';
import gps from '../../assets/images/gps.png';
import './form.scss';

class Form extends Component {
  state = {
    name: '',
    lastName:'',
    day: '',
    month: '',
    year: '',
    identification:'',
    email: '',
    phone:'',
    city:'',
    pl:'',
    view:'',
    users: [],
    submitted: false,
    error: false,
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

  focusInputBorder(x) {
    x.style.borderBottom = "1px red solid";
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
      lastName:'',
      day: '',
      month: '',
      year: '',
      identification:'',
      email: '',
      phone:'',
      city:'',
      pl:'',
      view:'',
      submitted: true
    });
  }
  
  render() {
    const { name, lastName, day, month, year, identification, email, phone, city, pl, view, submitted, error } = this.state;

    return (
      <div className="register">
        <Logo />
        <img className="register__close" src={close} alt ="button to close" />
        <img className="register__pointsregistertop" src={pointsRegisterTop} alt ="pointsregistertop" />
        <img className="register__circletopregister" src={circleTopRegister} alt ="circletop" />
        <img className="register__circlerightregister" src={circleRightRegister} alt ="circleRightRegister" />
        <img className="register__pointsrightregister" src={pointsRightRegister} alt ="pointsRightRegister" />
        <img className="register__ellipsetopregister" src={ellipseTopRegister} alt ="ellipseTopRegister" />
        <img className="register__ellipsebottomregister" src={ellipseBottomRegister} alt ="ellipseBottomRegister" />
        
        <div className="content">
          <h1 className="content__title">REGISTRO</h1>
          <p className="content__question">¿Deseas convertirte en un Senior de prestigio? Haz parte de nuestro próximo entrenamiento, registrarte y estaremos en contacto contigo</p>
        </div>
        <Photo />
        <form  className="form" onSubmit={this.handleOnSubmit}>
          
          <div className="categorie categorie--double">
            <span className="categorie__title">Nombre*</span>
            <input className="categorie__input categorie__input--small" onfocus={() => this.focusInputBorder(this)} value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Escribe tu nombre"/>
          </div>
          <div className="categorie categorie--double">
            <span className="categorie__title">Apellido*</span>
            <input className="categorie__input categorie__input--small" onfocus={() => this.focusInputBorder(this)} value={lastName} onChange={this.handleOnChange} type="text" name="apellido" placeholder="Escribe tu apellido"/>
          </div>
          <div className="categorie categorie--double">
            <span className="categorie__title">Fecha de nacimiento</span>
            <div className="categorie categorie--row">
              <input className="categorie__input categorie__input--center" onfocus={() => this.focusInputBorder(this)} value={day} onChange={this.handleOnChange} type="number" name="day" min="01" max="31" placeholder="DD"/>
              <input className="categorie__input categorie__input--middle" onfocus={() => this.focusInputBorder(this)} value={month} onChange={this.handleOnChange} type="number" name="month" min="01" max="12" placeholder="MM"/>
              <input className="categorie__input categorie__input--center" onfocus={() => this.focusInputBorder(this)} value={year} onChange={this.handleOnChange} type="number" name="year" min="1950" max="2000" placeholder="AAAA"/>
            </div>
          </div>
          <div className="categorie">
            <span className="categorie__title">Cédula</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={identification} onChange={this.handleOnChange} type="number" name="identification" placeholder="Escribe tu cédula"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Correo Electrónico*</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="Escribe tu correo"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Teléfono</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={phone} onChange={this.handleOnChange} type="number" name="phone" placeholder="Escribe tu teléfono"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">¿En donde te encuentras?*</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={city} onChange={this.handleOnChange} type="text" name="city" placeholder="Escribe el nombre de tu ciudad"/>
            <img className="categorie__gps" src={gps} alt="ubicación" />
          </div>
          <div className="categorie">
            <span className="categorie__title">¿Cuál es tu visión PL?*</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={pl} onChange={this.handleOnChange} type="text" name="pl" placeholder="Escribe tu visión PL"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">¿Cuál es tu visión personal?</span>
            <input className="categorie__input" onfocus={() => this.focusInputBorder(this)} value={view} onChange={this.handleOnChange} type="text" name="view" placeholder="Escribe tu visión personal"/>
          </div>
          <button  className="categorie__submit" type="submit">Completar registro</button>
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