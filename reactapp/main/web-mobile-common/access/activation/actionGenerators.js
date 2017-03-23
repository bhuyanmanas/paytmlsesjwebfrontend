import { postObject } from '../../socket/actionGenerators';
import { updateField } from '../../common/actionGenerators';
import {
  UPDATE_CODE,
  UPDATE_ACTIVATION_ERROR,
  UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION
 } from './types';

export const activateUserThroughSocket = (email, code) => {
  return postObject({
    messageType: 'toServerActivateAccount',
    email,
    code
  });
};

export const updateEmailIsAvailableErrorActivation =
  (msg) => updateField(UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION, msg);

export const updateCode = (code) => updateField(UPDATE_CODE, code);

export const updateActivationError =
  (code) => updateField(UPDATE_ACTIVATION_ERROR, code);

export const resendActivationCodeThroughSocket = (email) => {
  return postObject({
    messageType: 'toServerResendActivationCode',
    email
  });
};
