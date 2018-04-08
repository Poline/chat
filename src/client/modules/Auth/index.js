import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';

const Auth = ({ dispatch, children, match }) => {
  debugger
  return (
    <div className="Auth">
      <Route
        path={`${match.url}/signup`}
        dispatch={dispatch}
        component={SignUp}
      />
      <Route
        path={`${match.url}/signin`}
        dispatch={dispatch}
        component={SignIn}
      />
    </div>
)}

export default Auth;
