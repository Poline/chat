import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../../../../reducers/user';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './styles.scss';

class SignIn extends PureComponent {
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

    this.props.signIn(this.state);
  };

  render() {
    return (
      <div className="sign-in">
        <h1> Войдите в личный кабинет </h1>
        <Form onSubmit={this.handleSubmit}>

          <FormGroup>
            <Label for="name">Email</Label>
            <Input
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleOnChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Пароль</Label>
            <Input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleOnChange}
            />
          </FormGroup>
            
          <Button color="primary" type="submit">Войти</Button>

          <Link to='/auth/signup'> Нет аккаунта? </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => {
    dispatch(signIn(credentials));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
