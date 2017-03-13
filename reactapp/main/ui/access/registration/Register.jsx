import React, { Component } from 'react';
import * as Redux from 'react-redux';
import { Link, hashHistory } from 'react-router';
import validator from 'validator';

import { LOGIN_LINK, LOGIN_TEXT, REGISTRATION_SUCCESS_LINK, RESEND_ACTIVATION_LINK, RESEND_ACTIVATION_TEXT } from '../../../../routes';
import { registerUserThroughSocket, checkEmailAvailableThroughSocket, checkUsernameAvailableThroughSocket } from '../../../web-mobile-common/access/registration/actionGenerators';

export const Register = React.createClass({
    getInitialState: function() {
      return {
        isUsernameIsAvailable: false,
        isEmailIsAvailable: false,
        emailError: '',
        usernameError: '',
        passwordError: '',
        confirmError: '',
        registrationError: ''
      };
    },
    checkEmail: function(e) {
      const inputValue = e.target.value;
      if (inputValue !== '' && !validator.isEmail(inputValue)) {
        this.setState({ emailError: 'Must be a valid email address' });
      } else if (!this.state.emailError) {
        this.setState({ emailError: '' });
      }
    },
    checkAvailable: function(e) {
      const { dispatch } = this.props;
      const that = this;
      const inputValue = e.target.value;
      const checkVariable = e.target.getAttribute('data-check').toLowerCase();
      const checkVariableTitleCase = checkVariable.charAt(0).toUpperCase() + checkVariable.slice(1)
      const errorVariable = checkVariable + 'Error';
      const stateVariable = "is" + checkVariableTitleCase + "IsAvailable";

      if (inputValue !== '') {
        if ((checkVariable == 'email' && validator.isEmail(inputValue)) || checkVariable == 'username') {
          if (checkVariable == 'email') {
            checkEmailAvailableThroughSocket(inputValue)
          } else {
            checkUsernameAvailableThroughSocket(inputValue)
          }
        }
      } else {
        this.setState({
          [errorVariable]: checkVariableTitleCase + ' is required'
        });
      }


    },
    checkPassword: function(e) {
      const inputValue = e.target.value;
      const checkVariable = e.target.getAttribute('data-check').toLowerCase();
      const checkVariableTitleCase = checkVariable.charAt(0).toUpperCase() + checkVariable.slice(1)
      const errorVariable = checkVariable + 'Error';
      this.setState({
          [errorVariable]: inputValue === '' ? checkVariableTitleCase + ' is required' : ''
      });
      if (checkVariable === 'confirm' && this.refs.password.value !== this.refs.confirm.value) {
        this.setState({
          confirmError: 'Passwords do not match'
        });
      }
    },
    onRegister() {
      const { dispatch } = this.props;
      const { usernameError, emailError, passwordError, confirmError } = this.state;
      if (usernameError === '' && emailError === '' && passwordError === '' && confirmError === '') {
        dispatch(registerUserThroughSocket(email.value, username.value, password.value))
      } else {
        this.setState({
          registrationError: 'Please complete all fields and ensure they are valid.'
        });
      }

    },
    render() {
        return (
            <div className="container">
                <div className="row main">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1 className="title">Register</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="main-login main-center">
                            <form className="form-horizontal">
                              <div className="text-help">
                                {this.state.registrationError}
                              </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Your Email</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.emailError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"> </i></span>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your Email" data-check="email" onBlur={this.checkEmail} onChange={this.checkAvailable} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.emailError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username" className="control-label">Username</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.usernameError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                                            <input type="text" className="form-control" name="username" id="username" ref="username" placeholder="Choose a Username" data-check="username" onBlur={this.checkAvailable} onChange={this.checkAvailable}/>
                                        </div>
                                        <div className="text-help">
                                          {this.state.usernameError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="control-label">Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.passwordError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="password" id="password" ref="password" placeholder="Enter your Password" data-check="password" ref="password" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.passwordError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm" className="control-label">Confirm Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.confirmError !== ''  ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password" data-check="confirm" ref="confirm" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.confirmError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onRegister}>Register</button>
                                </div>
                                <div className="login-register">
                                    <Link to={LOGIN_LINK}>{LOGIN_TEXT}</Link> <Link to={RESEND_ACTIVATION_LINK}>{RESEND_ACTIVATION_TEXT}</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Redux.connect((state) => {
  return state;
})(Register);
