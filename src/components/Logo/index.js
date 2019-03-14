import React from 'react';
import logo from '../../assets/images/seniors-logo.png';
import Button from '../Button';
import close from '../../assets/images/close.png';
import './logo.scss';

const Logo = ({ onChangeRegisterFormStatus, isRegisterActive, classShowLogo }) => (
  <div className={`logo__container ${isRegisterActive ? 'mb-35' : ''}`}>
    <img className='logo' src={logo} alt="Senior Academic Logo" />
    {!isRegisterActive ? (
      <div>
        <Button
          className="button--desktop"
          onChangeRegisterFormStatus={onChangeRegisterFormStatus}
        >
          Regístrate ahora
        </Button>
      </div>
    ) : (
      <img
        className="logo__close-btn"
        src={close}
        alt="button to close"
        onClick={() => onChangeRegisterFormStatus(false)}
      />
    )}
  </div>
);
export default Logo;
