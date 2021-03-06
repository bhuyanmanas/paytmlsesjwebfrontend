import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import validator from 'validator';

import { LOGIN_LINK, LOGIN_TEXT, REGISTRATION_SUCCESS_LINK, RESEND_ACTIVATION_LINK, RESEND_ACTIVATION_TEXT, ACTIVATE_FORM_LINK, ACTIVATE_FORM_TEXT, LOGOUT_LINK } from '../../../../routes';
import { registerUserThroughSocket, checkEmailAvailableThroughSocket, checkUsernameAvailableThroughSocket } from '../../../web-mobile-common/access/registration/actionGenerators';
import { updateEmail, updateUsername } from '../../../web-mobile-common/access/authentication/actionGenerators';

class Register extends Component {

    componentWillMount() {
        if (this.props.user) {
            hashHistory.push(LOGOUT_LINK)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isUsernameIsAvailable: false,
            isEmailIsAvailable: false,
            emailError: '',
            usernameError: '',
            passwordError: '',
            confirmError: '',
            registrationError: ''
        };

        this.checkEmail = this.checkEmail.bind(this);
        this.checkAvailable = this.checkAvailable.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.onRegister = this.onRegister.bind(this);

    }

    componentDidMount() {
        this.refs.username.value = this.props.username;
        this.refs.email.value = this.props.email;
    }

    checkEmail(e) {
      const inputValue = e.target.value;
      if (inputValue !== '' && !validator.isEmail(inputValue)) {
        this.setState({ emailError: 'Must be a valid email address' });
      } else {
        this.props.updateEmail(inputValue);
        this.setState({ emailError: '' });
      }
    }

    checkAvailable(e) {
      const inputValue = e.target.value;
      const checkVariable = e.target.getAttribute('data-check').toLowerCase();
      const checkVariableTitleCase = checkVariable.charAt(0).toUpperCase() + checkVariable.slice(1);
      const errorVariable = checkVariable + 'Error';

      if (inputValue !== '') {
        if ((checkVariable == 'email' && validator.isEmail(inputValue)) || checkVariable == 'username') {
          if (checkVariable == 'email') {
            this.props.checkEmailAvailableThroughSocket(inputValue)
          } else {
            this.props.updateUsername(inputValue);
            this.props.checkUsernameAvailableThroughSocket(inputValue)
          }
        }
      } else {
        this.setState({
          [errorVariable]: checkVariableTitleCase + ' is required'
        });
      }
    }

    checkPassword(e) {
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
    }

    onRegister() {
      const { usernameError, emailError, passwordError, confirmError } = this.state;
      if (usernameError === '' && emailError === '' && passwordError === '' && confirmError === '') {
        this.props.registerUserThroughSocket(username.value, email.value, password.value)
      } else {
        this.setState({
          registrationError: 'Please complete all fields and ensure they are valid.'
        });
      }
    }

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
                                            <input type="text" className="form-control" name="email" id="email" ref="email" placeholder="Enter your Email" data-check="email" onBlur={this.checkEmail} onChange={this.checkAvailable} />
                                        </div>
                                        <div className="text-help">
                                            {this.state.emailError}
                                            {this.props.emailAvailableError}
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
                                            {this.props.usernameAvailableError}
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
                                    <p><Link to={LOGIN_LINK}>{LOGIN_TEXT}</Link></p>
                                    <p><Link to={RESEND_ACTIVATION_LINK}>{RESEND_ACTIVATION_TEXT}</Link></p>
                                    <p><Link to={ACTIVATE_FORM_LINK}>{ACTIVATE_FORM_TEXT}</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ registration, authentication }) => {
    const { user, username, email } = authentication;
    const { emailAvailableError, usernameAvailableError } = registration;
    return { user, emailAvailableError, usernameAvailableError, username, email }
};

export default connect(mapStateToProps, {
    checkUsernameAvailableThroughSocket,
    checkEmailAvailableThroughSocket,
    registerUserThroughSocket,
    updateEmail,
    updateUsername
})(Register);
