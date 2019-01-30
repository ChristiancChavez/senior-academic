import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Form from './components/Form';
import Home from './components/Home';
import Error404 from './components/Error/404';
import Users from './components/Users';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/users" component={Users} exact/>
      <Route path="/users/:userId" component={Users} exact/>
      <Route path="/form" component={Form} exact />
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;