import React from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';

const Cabinet = ({ dispatch, children, match }) => {
  return (
    <div className="Cabinet">
      <Route
        path={`${match.url}`}
        dispatch={dispatch}
        component={Home}
      />
    </div>
)}

export default Cabinet;
