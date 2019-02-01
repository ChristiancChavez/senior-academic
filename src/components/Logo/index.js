import React from 'react';
import logo from '../../assets/images/logo.png';
import './logo.scss';

const Logo = () => (
    <div className="logo">
      <img className="logo__image" src={logo} alt ="logo of senior academic" />
    </div>
);
export default Logo;