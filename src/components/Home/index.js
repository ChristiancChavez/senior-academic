import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="Home">
    <Link to="/form">User register</Link>
    <Link to="/users">List of Users</Link>
  </div>
);

export default Home;