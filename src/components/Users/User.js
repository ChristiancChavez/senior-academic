import React, { Component, Fragment } from 'react';
import { storage } from '../../firebase';
import spinner from '../../assets/images/spinner.gif';
import defaultPic from '../../assets/images/profile.jpg';

class User extends Component {

  state = {
    url: spinner
  }
  
  componentDidMount() {
    if (this.props.info.image) {
      storage.ref('images').child(this.props.info.image).getDownloadURL().then(url => {
        this.setState({
          url
        });
      });
    } else {
      this.setState({
        url: defaultPic
      });
    }
  };
  
  render(){
  const {
    info: {
      name,
      last_name,
      email,
      day,
      month,
      year,
      city,
      pl_vision,
      personal_vision,
    }
  } = this.props;
  
  const { url } = this.state;
  
  return(
    <Fragment>
      <h1 className="users__title">User information</h1>
      <ul className="users__info">
        <li><span>Nombre:</span> {name} {last_name}</li>
        <li><span>Email:</span> {email}</li>
        <li><span>Fecha de nacimiento:</span> {day}/{month}/{year}</li>
        <li><span>Ciudad:</span> {city} </li>
        <li><span>Visión PL:</span> {pl_vision}</li>
        {personal_vision && <li><span>Vision personal:</span> {personal_vision}</li>}
      </ul>
      <img className="users__image" src={url} alt="user info"/>
    </Fragment>
  )}
};

export default User;