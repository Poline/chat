import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUp from './containers/SignUp/index';
import SignIn from './containers/SignIn/index';

import { authorize } from '../../reducers/user';

class Auth extends PureComponent {
  componentWillMount(){
    this.props.authorize();
  }

  render() {
    const { dispatch } = this.props;

    if (Object.keys(this.props.user).length > 0) {
      return <Redirect to='/'/>;
    }

    return (
      <div className="Auth">
      <Route
        path={`/auth/signup`}
        dispatch={dispatch}
        component={SignUp}
      />
      <Route
        path={`/auth/signin`}
        dispatch={dispatch}
        component={SignIn}
      />
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authorize: () => {
    dispatch(authorize());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
