import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import validator from 'validator';

import { LOGIN_LINK, LOGIN_TEXT, REGISTRATION_SUCCESS_LINK, RESEND_ACTIVATION_LINK, RESEND_ACTIVATION_TEXT, LOGOUT_LINK } from '../../../../routes';
import { activateUserThroughSocket } from '../../../web-mobile-common/access/activation/actionGenerators';
import { emptyMapStateToProps } from '../../../web-mobile-common/common/misc';
import { updateEmail } from '../../../web-mobile-common/access/authentication/actionGenerators';

class ActivateForm extends Component {

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
            emailError: '',
            codeError: '',
            activationError: ''
        };

        this.checkEmail = this.checkEmail.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.onActivate = this.onActivate.bind(this);
    }

    checkEmail(e) {
      const text = this.refs.email.value.trim();
      this.refs.email.value = text;
      if (text !== '' && !validator.isEmail(text)) {
        this.setState({emailError: 'Must be a valid email address'});
      } else if (text === '') {
        this.setState({ emailError: 'Email cannot be blank' })
      } else {
        this.props.updateEmail(text);
        this.setState({ emailError: '' });
      }
    }

    checkCode(e) {
      const code = this.refs.code.value.trim();
      this.refs.code.value = code;
      if (code === '') {
          this.setState({ codeError: 'Code should not be empty' })
      } else {
          this.setState({ codeError: '' })
      }
    }

    onActivate() {
      const { emailError, codeError } = this.state;
      if (emailError === '' && codeError === '') {
        this.props.activateUserThroughSocket(this.refs.email.value, this.refs.code.value)
      } else {
        this.setState({
          activationError: 'Please complete all fields and ensure they are valid.'
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
                                <h1 className="title">Activate account</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="main-login main-center">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Your Email</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.emailError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"> </i></span>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your Email" data-check="email" ref="email" onBlur={this.checkEmail} onChange={this.checkEmail} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.emailError}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="code" className="control-label">Activation code</label>
                                    <div className="cols-sm-10">
                                        <div className={`input-group ${this.state.codeError !== '' ? 'has-danger' : ''}`}>
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                            <input type="text" className="form-control" name="code" id="code" ref="code" placeholder="Enter your activation code" data-check="code" ref="code" onBlur={this.checkCode} onChange={this.checkCode} />
                                        </div>
                                        <div className="text-help">
                                          {this.state.codeError}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-help">
                                    {this.props.error}
                                </div>

                                <div className="form-group ">
                                    <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.onActivate}>Activate</button>
                                </div>
                                <div className="login-register">
                                    <p><Link to={LOGIN_LINK}>{LOGIN_TEXT}</Link></p>
                                    <p><Link to={RESEND_ACTIVATION_LINK}>{RESEND_ACTIVATION_TEXT}</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ activation, authentication }) => {
    const { user, email } = authentication;
    const { error } = activation;
    return { user, error, email };
};

export default connect(mapStateToProps, {
    activateUserThroughSocket, updateEmail
})(ActivateForm);
