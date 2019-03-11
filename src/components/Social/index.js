import React from 'react';
// import line from '../../assets/images/linemobil.png';
import socialmedia from '../../assets/images/socialmedia.png';

import './social.scss';


const Social = () => (
    <div className="social">
        <span  className="social__hastag">#SomosSenior</span>
        <div className="social__line"></div>
        <span className="social__icons">
            <img src={socialmedia} alt="redes sociales" />
        </span>
    </div>
);
export default Social;