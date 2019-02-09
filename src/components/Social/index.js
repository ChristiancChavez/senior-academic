import React from 'react';
// import line from '../../assets/images/linemobil.png';
import socialmedia from '../../assets/images/socialmedia.png';

import './social.scss';

const Social = () => (
  <div>
    <div className="social">
      <span className="social__hastag">#SomosSenior</span>
      <div className="social__line" />
      <img src={socialmedia} alt="redes sociales" />
    </div>
  </div>
);
export default Social;
