import React from 'react';
// import line from '../../assets/images/linemobil.png';
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';
import Button from '../Button';

import './social.scss';

const Social = ({ onSubmitForm, isRegisterActive }) => (
  <div className={`social__container ${isRegisterActive ? 'mb-35 mt-25' : ''}`}>
    {isRegisterActive && (
      <div>
        <Button isAform onSubmitForm={onSubmitForm}>
          Completar registro
        </Button>
      </div>
    )}
    <div>
      <div className="social">
        <span className="social__hastag mr-25">#SomosSenior</span>
        <div className="social__line mr-25" />
        <a className="social__icon social__icon--face" href="https://www.w3schools.com"><img src={facebook} alt="facebook" /></a>
        <a className="social__icon" href="https://www.w3schools.com"><img src={instagram} alt="instagram" /></a>
      </div>
    </div>
  </div>
);
export default Social;
