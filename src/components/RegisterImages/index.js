import React, { Component, Fragment } from 'react';
import pointsRegisterTop from '../../assets/images/pointsregistertop.png';
import pointsRightRegister from '../../assets/images/pointsrightregister.png';
import circleTopRegister from '../../assets/images/circletopregister.png';
import circleRightRegister from '../../assets/images/circlerightregister.png';
import ellipseBottomRegister from '../../assets/images/ellipsebottomregister.png';
import ellipseTopRegister from '../../assets/images/ellipsetopregister.png';

export default class RegisterImages extends Component {
  render() {
    return (
      <Fragment>
        <img
          className="register__pointsregistertop"
          src={pointsRegisterTop}
          alt="pointsregistertop"
        />
        <img
          className="register__circletopregister"
          src={circleTopRegister}
          alt="circletop"
        />
        <img
          className="register__circlerightregister"
          src={circleRightRegister}
          alt="circleRightRegister"
        />
        <img
          className="register__pointsrightregister"
          src={pointsRightRegister}
          alt="pointsRightRegister"
        />
        <img
          className="register__ellipsetopregister"
          src={ellipseTopRegister}
          alt="ellipseTopRegister"
        />
        <img
          className="register__ellipsebottomregister"
          src={ellipseBottomRegister}
          alt="ellipseBottomRegister"
        />
      </Fragment>
    );
  }
}
