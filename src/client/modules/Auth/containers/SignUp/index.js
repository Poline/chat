import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUp } from '../../reducer';

import './styles.scss';

class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(signUp(this.state));
  };

  render() {
    return (
      <div className="sign-up">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleOnChange}
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleOnChange}
          />
          <button type="submit">Sign Up</button>

          <Link to='/'> Есть аккаунт? </Link>
        </form>
      </div>
    );
  }
}

export default connect()(SignUp);
