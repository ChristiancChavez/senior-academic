import React, { Component, Fragment } from 'react';
import circleRight from '../../assets/images/circlerightmobil.png';
import circleLeft from '../../assets/images/circleleftmobil.png';
import pointsTop from '../../assets/images/pointstop.png';
import circleTop from '../../assets/images/circletop.png';
import circleRightBig from '../../assets/images/circleright.png';
import ellipseTop from '../../assets/images/ellipsetop.png';
import ellipseMiddle from '../../assets/images/ellipsemiddle.png';
import ellipseBottom from '../../assets/images/ellipsebottom.png';
import pointsTopSquare from '../../assets/images/pointstopsquare.png';
import pointsMiddle from '../../assets/images/pointsmiddleleft.png';
import pointsBottom from '../../assets/images/pointsbottom.png';

export default class HomeImages extends Component {
  render() {
    const { isAnimationActive } = this.props;
    return (
      <Fragment>
        <img className="home__points" src={pointsTop} alt="points" />
        <img
          className="home__circleright"
          src={circleRight}
          alt="circle right"
        />
        <img className="home__circleleft" src={circleLeft} alt="circle left" />
        <img className={`home__circletop ${isAnimationActive ? 'home__circletop-bottomsappeartop' : ''}`} src={circleTop} alt="circletop" />
        <img
          className={`home__circlerightbig ${isAnimationActive ? 'home__circlerightbig-bottomsappear' : ''}`}
          src={circleRightBig}
          alt="circle right big"
        />
        <img className="home__ellipsetop" src={ellipseTop} alt="ellipse Top" />
        <img
          className={`home__ellipsemiddle ${isAnimationActive ? 'home__ellipsemiddle-slidemiddlepoint' : ''}`}
          src={ellipseMiddle}
          alt="ellipse Middle"
        />
        <img
          className={`home__ellipsebottom ${isAnimationActive ? 'home__ellipsebottom-slideuppoint' : ''}`}
          src={ellipseBottom}
          alt="ellipse Bottom"
        />
        <img
          className="home__pointstopsquare"
          src={pointsTopSquare}
          alt="points Top Square"
        />
        <img
          className="home__pointsmiddle"
          src={pointsMiddle}
          alt="points Middle"
        />
        <img
          className={`home__pointsbottom ${isAnimationActive ? 'home__pointsbottom-appearpoints' : ''}`}
          src={pointsBottom}
          alt="points Bottom"
        />
      </Fragment>
    );
  }
}
