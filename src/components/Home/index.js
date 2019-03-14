import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import Description from '../Description';
import Countable from '../Countable';
import Button from '../Button';
import Social from '../Social';
import Logo from '../Logo';
import Form from '../Form';
import HomeImages from '../HomeImages';
import { Link } from 'react-router-dom';

import './home.scss';

class Home extends Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRegisterActive: false,
    classShowLogo: false,
  };

  componentWillMount() {
    this.getRestTime();
    this.showlogo();
  };

  componentDidMount() {
    setInterval(() => this.getRestTime(), 1000);
    
  };

  closeInterval = () => {
    clearInterval(this.interval);
  };

  getRestTime = () => {
    const finalDate = 'February 28, 2019, 16:40:00';
    const time = Date.parse(finalDate) - Date.parse(new Date());
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    if (time < 0) {
      this.setState({
        message: true
      });
      this.closeInterval();
    } else {
      this.setState({
        days,
        hours,
        minutes,
        seconds
      });
    }
  };

  showlogo = () => {
    this.setState({
      classShowLogo: true,
    })
  };

  leadingZero = num => {
    return num < 10 ? '0' + num : num;
  };

  onChangeRegisterFormStatus = isRegisterActive => {
    this.setState({ isRegisterActive });
  };

  render() {
    const { days, minutes, hours, seconds, isRegisterActive, classShowLogo } = this.state;
    return (
      <div className={`${isRegisterActive ? 'register' : 'home'}`}>
        <Logo
          onChangeRegisterFormStatus={this.onChangeRegisterFormStatus}
          isRegisterActive={isRegisterActive}
          classShowLogo={classShowLogo}
        />
        {!isRegisterActive && (
          <Fragment>
            <Description />
            <Countable
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              leadingZero={this.leadingZero}
            />
            <Button
              className="button--mobile"
              onChangeRegisterFormStatus={this.onChangeRegisterFormStatus}
            >
              Regístrate ahora
            </Button>
            {/* <button className="button button__users">
              <Link to="/users" style={{ color: 'white', textDecoration: 'none' }}>List of users</Link> 
            </button> */}
          </Fragment>
        )}
        {isRegisterActive && <Form isRegisterActive={isRegisterActive} />}
        {!isRegisterActive && <Social isRegisterActive={isRegisterActive} />}
        {!isRegisterActive && <HomeImages />}
      </div>
    );
  }
}

export default Home;
