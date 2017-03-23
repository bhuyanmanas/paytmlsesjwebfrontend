import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Template from './main/ui/Template';
import LoginOrRegister from './main/ui/access/LoginOrRegister';
import Register from './main/ui/access/registration/Register';
import ResendActivation from './main/ui/access/registration/ResendActivation';
import RegistrationSuccess from './main/ui/access/registration/RegistrationSuccess';
import Activate from './main/ui/access/registration/Activate';
import ActivateForm from './main/ui/access/registration/ActivateForm';
import ActivationFailed from './main/ui/access/registration/ActivationFailed';
import Login from './main/ui/access/authentication/Login';
import Logout from './main/ui/access/authentication/Logout';
import LogoutAllDevices from './main/ui/access/authentication/LogoutAllDevices';
import RequestResetPassword from './main/ui/access/authentication/RequestResetPassword';
import ResetPassword from './main/ui/access/authentication/ResetPassword';
import ManageAccount from './main/ui/user/ManageAccount';
import ChangePassword from './main/ui/user/ChangePassword';
import PasswordChangeSuccessful from './main/ui/user/PasswordChangeSuccessful';
import TwitterSearch from './main/ui/domain/TwitterSearch';

export const REGISTER_LINK = "/register";
export const REGISTER_TEXT = "Register";
export const LOGIN_LINK = "/login";
export const LOGIN_TEXT = "Login";
export const LOGOUT_LINK = "/logout";
export const LOGOUT_TEXT = "Logout";
export const REGISTRATION_SUCCESS_LINK = "/registration-success";
export const ACTIVATE_FORM_LINK = '/activate-form';
export const ACTIVATE_FORM_TEXT = 'Activate account';
export const MANAGE_ACCOUNT_LINK = "/manage-account";
export const MANAGE_ACCOUNT_TEXT = "My account";
export const CHANGE_PASSWORD_LINK = "/change-password";
export const CHANGE_PASSWORD_TEXT = "Change Password";
export const PASSWORD_CHANGE_SUCCESSFUL_LINK = "/password-change-successful";
export const ACTIVATE_LINK = "/activate";
export const ACTIVATION_FAILED_LINK = "/activation-failed";
export const REQUEST_RESET_PASSWORD_LINK = "/request-reset-password";
export const REQUEST_RESET_PASSWORD_TEXT = "Forgot your password?";
export const RESET_PASSWORD_LINK = "/reset-password";
export const RESET_PASSWORD_TEXT = "Enter password reset code";
export const RESEND_ACTIVATION_LINK = "/resend-activation-code";
export const RESEND_ACTIVATION_TEXT = "Re-send activation code";
export const LOGOUT_ALL_DEVICES_LINK = "/logout-all-devices";
export const LOGOUT_ALL_DEVICES_TEXT = "Logout-all-devices";
export const TWITTER_SEARCH_LINK = "/twitter-search";
export const TWITTER_SEARCH_TEXT = "TwitterSearch";

export default (
<Route path="/" component={Template}>
    <IndexRoute component={LoginOrRegister} />
    <Route path={REGISTER_LINK} component={Register} />
    <Route path={REGISTRATION_SUCCESS_LINK} component={RegistrationSuccess} />
    <Route path={LOGIN_LINK} component={Login}  />
    <Route path={LOGOUT_LINK} component={Logout} />
    <Route path={LOGOUT_ALL_DEVICES_LINK} component={LogoutAllDevices} />
    <Route path={MANAGE_ACCOUNT_LINK} component={ManageAccount}  />
    <Route path={CHANGE_PASSWORD_LINK} component={ChangePassword} />
    <Route path={PASSWORD_CHANGE_SUCCESSFUL_LINK} component={PasswordChangeSuccessful} />
    <Route path={ACTIVATE_LINK} component={Activate} />
    <Route path={ACTIVATION_FAILED_LINK} component={ActivationFailed} />
    <Route path={REQUEST_RESET_PASSWORD_LINK} component={RequestResetPassword} />
    <Route path={RESET_PASSWORD_LINK} component={ResetPassword} />
    <Route path={RESEND_ACTIVATION_LINK} component={ResendActivation} />
    <Route path={ACTIVATE_FORM_LINK} component={ActivateForm} />
    <Route path={TWITTER_SEARCH_LINK} component={TwitterSearch} />
</Route>
);
