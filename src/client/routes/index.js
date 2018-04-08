import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../modules/Auth';
import Cabinet from '../modules/Cabinet';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Cabinet} />
    </Switch>
  </Router>
);

export default Routes;
