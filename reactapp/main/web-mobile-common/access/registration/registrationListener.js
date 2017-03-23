import {
  EMAIL_IS_AVAILABLE,
  USERNAME_IS_AVAILABLE,
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILED } from './types';
import {
  ACCOUNT_ACTIVATION_SUCCESSFUL,
  RESEND_ACTIVATION_CODE_RESULT,
  ACTIVATION_FAILED,
  ACCOUNT_ALREADY_ACTIVE } from '../activation/types';
import {
  updateEmailIsAvailableErrorRegistration,
  updateUsernameIsAvailableError,
  updateRegistrationError } from './actionGenerators';
import {
  updateEmailIsAvailableErrorActivation,
  updateActivationError } from '../activation/actionGenerators';

export const registrationListener = (store, redirects) => {
    const lastAction = store.getState().lastAction;
    switch (lastAction.type) {
      case EMAIL_IS_AVAILABLE: {
        const errorMessageRegistration = lastAction.payload.available ? '' : 'Already registered';
        const errorMessageActivation = lastAction.payload.available ? 'Email not registered' : '';
        store.dispatch(updateEmailIsAvailableErrorRegistration(errorMessageRegistration));
        store.dispatch(updateEmailIsAvailableErrorActivation(errorMessageActivation));
        break;
      }
      case USERNAME_IS_AVAILABLE: {
        const errorMessage = lastAction.payload.available ? '' : 'Already registered';
        store.dispatch(updateUsernameIsAvailableError(errorMessage));
        break;
      }
      case REGISTRATION_SUCCESSFUL: {
        redirects.activateForm();
        break;
      }
      case REGISTRATION_FAILED: {
        store.dispatch(updateRegistrationError('Registration failed.'));
        break;
      }
      case ACCOUNT_ACTIVATION_SUCCESSFUL: {
        redirects.authentication();
        break;
      }
      case ACTIVATION_FAILED: {
        store.dispatch(updateActivationError(lastAction.payload));
        break;
      }
      case ACCOUNT_ALREADY_ACTIVE: {
        store.dispatch(updateActivationError("Account already active"));
        break;
      }
      case RESEND_ACTIVATION_CODE_RESULT: {
        store.dispatch(updateActivationError(lastAction.payload));
        redirects.activateForm();
        break;
      }
      default:
        return;
    }
};
