import React, { Component } from 'react';
import firebase, { storage } from '../../firebase';
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
import { dataInput } from '../../assets/data';
import Input from '../Form/Input';
import './form.scss';

class Form extends Component {
  constructor() {
    super();
    
    this.state = {
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
      image: null
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
          identification: users[user].identification,
          email: users[user].email,
          phone: users[user].phone,
          day: users[user].day,
          month: users[user].month,
          year: users[user].year
        }));

        this.setState({
          users: newState
        });
      }
    });

    // It is to join the button with the event of the choose a file
    document.getElementById('get_file').onclick = function() {
      document.getElementById('my_file').click();
    };
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
  }

  focusInputBorder = e => {
    const { style } = e.target;
    style.borderBottom = "1px red solid";
  }

  blurInputBorder = e => {
    const { style } = e.target;
    style.borderBottom = "";
  }

  handleOnSubmit = e => {
    e.preventDefault();

    this.form.current.reportValidity();
    const usersRef = firebase.database().ref('users');

    const {
      name,
      lastName,
      identification,
      email,
      image,
      phone,
      day,
      month,
      year,
      city,
      pl,
      view 
    } = this.state;

    const item = {
      name: name,
      lastName: lastName,
      identification: identification,
      email: email,
      image: image.name,
      phone: phone,
      day: day,
      month: month,
      year: year,
      city: city,
      pl: pl,
      view: view,
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
      submitted: true,
      image: null
    });
  }
  
  render() {
    const { submitted, error, day, month, year } = this.state
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

        <form ref={this.form} className="form" onSubmit={this.handleOnSubmit}>
        <Photo onChange={this.handleChangeImage} />
          
          {dataInput.map((info, index) => (
            <Input
              key={index}
              {...info}
              val={!info.birth ? this.state[info.value] : { day, month, year }}
              onFocus={this.focusInputBorder}
              onBlur={this.blurInputBorder}
              onChange={this.handleOnChange}
            />
          ))}
          {/* <div className="categorie categorie--double">
            <span className="categorie__title">Nombre*</span>
            <input className="categorie__input categorie__input--small" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={name} onChange={this.handleOnChange} type="text" name="name" placeholder="Escribe tu nombre"/>
          </div>
          <div className="categorie categorie--double">
            <span className="categorie__title">Apellido*</span>
            <input className="categorie__input categorie__input--small" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={lastName} onChange={this.handleOnChange} type="text" name="lastName" placeholder="Escribe tu apellido"/>
          </div>
          <div className="categorie categorie--double">
            <span className="categorie__title">Fecha de nacimiento</span>
            <div className="categorie categorie--row">
              <input className="categorie__input categorie__input--center" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={day} onChange={this.handleOnChange} type="number" name="day" min="01" max="31" placeholder="DD"/>
              <input className="categorie__input categorie__input--middle" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={month} onChange={this.handleOnChange} type="number" name="month" min="01" max="12" placeholder="MM"/>
              <input className="categorie__input categorie__input--center" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={year} onChange={this.handleOnChange} type="number" name="year" min="1950" max="2000" placeholder="AAAA"/>
            </div>
          </div>
          <div className="categorie">
            <span className="categorie__title">Cédula</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={identification} onChange={this.handleOnChange} type="number" name="identification" placeholder="Escribe tu cédula"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Correo Electrónico*</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={email} onChange={this.handleOnChange} type="email" name="email" placeholder="Escribe tu correo"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">Teléfono</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={phone} onChange={this.handleOnChange} type="tel" name="phone" placeholder="Escribe tu teléfono"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">¿En donde te encuentras?*</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={city} onChange={this.handleOnChange} type="text" name="city" placeholder="Escribe el nombre de tu ciudad"/>
            <img className="categorie__gps" src={gps} alt="ubicación" />
          </div>
          <div className="categorie">
            <span className="categorie__title">¿Cuál es tu visión PL?*</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={pl} onChange={this.handleOnChange} type="text" name="pl" placeholder="Escribe tu visión PL"/>
          </div>
          <div className="categorie">
            <span className="categorie__title">¿Cuál es tu visión personal?</span>
            <input className="categorie__input" onFocus={this.focusInputBorder} onBlur={this.blurInputBorder} value={view} onChange={this.handleOnChange} type="text" name="view" placeholder="Escribe tu visión personal"/>
          </div> */}
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