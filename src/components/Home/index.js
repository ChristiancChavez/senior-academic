import React from 'react';
// import { Link } from 'react-router-dom';
import Logo from '../Logo/index';
import Description from '../Description/index';
import Countable from '../Countable/index';
import Button from '../Button/index';
import Social from '../Social/index';
import circleRight from '../../assets/images/circlerightmobil.png';
import circleLeft from '../../assets/images/circleleftmobil.png';
import pointsTop from '../../assets/images/pointstop.png';
import './home.scss';

const Home = () => (
  <div className="home">
    <Logo />
    <Description />
    <Countable />
    <Button />
    <Social />
    <img className="home__points" src={pointsTop} alt ="points" />
    <img className="home__circleright" src={circleRight} alt ="circle right" />
    <img className="home__circleleft" src={circleLeft} alt ="circle left" />
    {/* <Link to="/form">User register</Link>
    <Link to="/users">List of Users</Link> */}
  </div>
);

export default Home;