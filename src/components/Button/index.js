import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

const Button = ({ className }) => (
  <Link className={`button ${className}`} to="/form">
    Regístrate ahora
  </Link>
);
export default Button;
