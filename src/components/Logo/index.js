import React from 'react';
import logo from '../../assets/images/seniors-logo.png';
import Button from '../Button';
import './logo.scss';

const Logo = () => (
  <div className="logo__container">
    <img className="logo" src={logo} alt="Senior Academic Logo" />
    <div>
      <Button className="button--desktop" />
    </div>
  </div>
);
export default Logo;
