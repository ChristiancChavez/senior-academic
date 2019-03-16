import React from 'react';
// import line from '../../assets/images/linemobil.png';
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';
import Button from '../Button';

import './social.scss';

const Social = ({ onSubmitForm, isRegisterActive, isAnimationActive }) => (
  <div className={`social__container ${isRegisterActive ? 'mb-35 mt-25' : ''}`}>
    {isRegisterActive && (
      <Button className="registerMobil" isAform onSubmitForm={onSubmitForm}>
        Completar registro
      </Button>
    )}
    <div className={`social ${isAnimationActive ? 'social-animation' : ''}`}>
      <span className="social__hastag mr-25">#YoSoySeniorElite</span>
      <div className="social__line mr-25" />
      <a
        className="social__icon social__icon--face"
        target="_blank"
        href="https://fb.me/seniorsgroup.org"
      >
        <img src={facebook} alt="facebook" />
      </a>
      <a
        className="social__icon"
        target="_blank"
        href="https://www.instagram.com/seniors.group/"
      >
        <img src={instagram} alt="instagram" />
      </a>
    </div>
  </div>
);
export default Social;
