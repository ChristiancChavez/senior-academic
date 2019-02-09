import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

const Button = () => (
  <Link className="button button--mobile" to="/form">
    Regístrate ahora
  </Link>
);
export default Button;
