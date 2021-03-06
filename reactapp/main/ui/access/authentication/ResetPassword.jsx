import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import validator from 'validator';


import { resetPasswordThroughSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';
import { LOGOUT_LINK } from '../../../../routes';

class ResetPassword extends Component {

    componentWillMount() {
        if (this.props.user) {
            hashHistory.push(LOGOUT_LINK)
        }
    }

    componentDidMount() {
        this.refs.email.value = this.props.email;
    }

    constructor(props) {
      super(props);
      this.state = {
        codeError: '',
        newpasswordError: '',
        confirmError: '',
        emailError: '',
        error: ''
      };

      this.checkPassword = this.checkPassword.bind(this);
      this.onResetPassword = this.onResetPassword.bind(this);
      this.checkCode = this.checkCode.bind(this);
      this.checkEmail = this.checkEmail.bind(this);
    }

    checkCode() {
        const code = this.refs.code.value.trim();
        this.refs.code.value = code;
        if (code === '') {
            this.setState({ codeError: 'Code is required' })
        } else {
            this.setState({ codeError: '' })
        }
    }

    checkEmail(e) {
        const email = this.refs.email.value.trim();
        this.refs.email.value = email;
        if (email !== '' && !validator.isEmail(email)) {
            this.setState({ emailError: 'Must be a valid email address' });
        } else {
            this.props.updateEmail(email);
            this.setState({ emailError: '' });
        }
    }

    checkPassword(e) {
      const inputValue = e.target.value;
      const checkVariable = e.target.getAttribute('data-check').toLowerCase();
      const errorVariable = checkVariable + 'Error';
      this.setState({
          [errorVariable]: inputValue === '' ? 'This field is required' : ''
      });
      if ((checkVariable === 'confirm' || checkVariable === 'newpassword' ) && this.refs.newpassword.value !== this.refs.confirm.value) {
        this.setState({
          confirmError: 'Passwords do not match'
        });
      } else {
        this.setState({
          confirmError: ''
        });
      }
    }

    onResetPassword() {
      const { newpasswordError, confirmError, codeError, emailError } = this.state;
      const { email } = this.props;
      const code = this.refs.code.value;
      if (newpasswordError === '' && confirmError === '' && codeError === '' && emailError == '') {
            this.setState({ error: '' });
            this.props.resetPasswordThroughSocket(email, code, this.refs.newpassword.value);
      } else {
          this.setState({ error: 'Please fix errors' });
      }
    }

    render() {
        return (
            <div className="container">
                <div className="row main">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1 className="title">Reset Password</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="main-login main-center">
                            <form className="form-horizontal">
                              <div className="text-help">
                                {this.props.resetCodeError}
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
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="code" className="control-label">Enter code emailed to you</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.codeError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="code" className="form-control" name="code" id="code" ref="code" placeholder="Enter password reset code" data-check="code" ref="code" onBlur={this.checkCode} onChange={this.checkCode} />
                                        </div>
                                        <div className="text-help">
                                            {this.state.codeError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newpassword" className="control-label">New Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.newpasswordError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="newpassword" id="newpassword" ref="newpassword" placeholder="Enter your new password" data-check="newpassword" ref="newpassword" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.newpasswordError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm" className="control-label">Confirm New Password</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.confirmError !== ''  ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your new password" data-check="confirm" ref="confirm" onBlur={this.checkPassword} onChange={this.checkPassword} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.confirmError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onResetPassword}>Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authentication }) => {
    const { user, resetCodeError, email } = authentication;
    return { user, resetCodeError, email }
};

export default connect(mapStateToProps, { resetPasswordThroughSocket })(ResetPassword);
