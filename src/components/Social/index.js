import React from 'react';
// import line from '../../assets/images/linemobil.png';
import socialmedia from '../../assets/images/socialmedia.png';
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
        <img src={socialmedia} alt="redes sociales" />
      </div>
    </div>
  </div>
);
export default Social;
