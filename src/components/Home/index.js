import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Logo from '../Logo/index';
import Description from '../Description/index';
import Countable from '../Countable/index';
import Button from '../Button/index';
import Social from '../Social/index';
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
import './home.scss';

class Home extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    message: false,
  }

  componentWillMount() {
    this.getRestTime();
  }
  componentDidMount() {
    setInterval(() => this.getRestTime(), 1000)
  }
  
  closeInterval = () => {
    clearInterval(this.interval);
  }
 
  getRestTime = () => {
    const finalDate = 'February 28, 2019, 16:40:00';
    const time = Date.parse(finalDate) - Date.parse(new Date());
    const seconds = Math.floor((time/1000) % 60);
    const minutes = Math.floor((time/1000/60) % 60);
    const hours = Math.floor(time/(1000*60*60) % 24);
    const days = Math.floor(time/(1000*60*60*24));
    if(time < 0){
      this.setState({
        message: true
      })
      this.closeInterval();
    } else {
      this.setState({
        days,
        hours, 
        minutes, 
        seconds,
      })
    }
    
  }
  leadingZero = (num) => {
    return num < 10 ? '0' + num : num
  }
      

  render () {
    const { days, minutes, hours, seconds, message } = this.state;
    return (
      <div className="home">
        <Logo />
        <Description />
        <Countable days={days} hours={hours} minutes={minutes} seconds={seconds}  leadingZero={this.leadingZero} />
        {message && <h1 className="home__startevent">LA CONVERSACIÓN HA INICIADO</h1>}
        <Button />
        <Social />
        <img className="home__points" src={pointsTop} alt ="points" />
        <img className="home__circleright" src={circleRight} alt ="circle right" />
        <img className="home__circleleft" src={circleLeft} alt ="circle left" />
        <img className="home__circletop" src={circleTop} alt ="circletop" />
        <img className="home__circlerightbig" src={circleRightBig} alt ="circle right big" />
        <img className="home__ellipsetop" src={ellipseTop} alt ="ellipse Top" />
        <img className="home__ellipsemiddle" src={ellipseMiddle} alt ="ellipse Middle" />
        <img className="home__ellipsebottom" src={ellipseBottom} alt ="ellipse Bottom" />
        <img className="home__pointstopsquare" src={pointsTopSquare} alt ="points Top Square" />
        <img className="home__pointsmiddle" src={pointsMiddle} alt ="points Middle" />
        <img className="home__pointsbottom" src={pointsBottom} alt ="points Bottom" />
        {/* <Link to="/form">User register</Link>
        <Link to="/users">List of Users</Link> */}
      </div>
    )
  }
}

export default Home;

