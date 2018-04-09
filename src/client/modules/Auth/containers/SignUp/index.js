import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../reducer';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './styles.scss';

class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.signUp(this.state);
  };

  render() {
    return (
      <div className="sign-up">
        <h1> Регистрация </h1>
        <Form onSubmit={this.handleSubmit}>

          <FormGroup>
            <Label for="name">Имя</Label>
            <Input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleOnChange}
            />
          </FormGroup>

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

          <Button color="primary" type="submit">Зарегистрироваться</Button>

          <Link to='/auth/signin'> Есть аккаунт? </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  signUp: (credentials) => {
    dispatch(signUp(credentials));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
