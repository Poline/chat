import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { signIn } from '../reducer';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUpdate(props){
    if (props.user !== undefined){
      browserHistory.replace('home');
    }
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(signIn(this.state));
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
          <button type="submit">Sign In</button>
        </form>

        <Link to='/signup'> Нет аккаунта? </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(SignIn);
