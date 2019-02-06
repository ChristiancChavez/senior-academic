import React, { Component } from 'react';
import { storage } from '../../firebase';
import spinner from '../../images/spinner.gif';

class User extends Component {

  state = {
    url: spinner
  }
  
  componentWillMount() {
    storage.ref('images').child(this.props.info.image).getDownloadURL().then(url => {
      this.setState({
        url
      });
    });
  };
  
  render(){
  const { info: { name, age, email } } = this.props;
  const { url } = this.state;
  
  return(
    <div>
      <h1>User information</h1>
      <br />
      <ul>
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Age:</strong> {age}</li>
        <li><strong>Email:</strong> {email}</li>
        <img src={url} alt="user info"/>
      </ul>
    </div>
  )}
};

export default User;