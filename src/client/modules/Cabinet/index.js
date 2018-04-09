import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';

import { authorize } from '../../reducers/user';

class Cabinet extends PureComponent {
  componentWillMount(){
    this.props.authorize();
  }

  render() {
    const { dispatch } = this.props;

    if (Object.keys(this.props.user).length === 0) {
      return <Redirect to='/auth/signIn'/>;
    }

    return (
      <div className="Home">
        <Route
          path={`/`}
          dispatch={dispatch}
          component={Home}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
