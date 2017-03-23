import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  UPDATE_CODE } from './types';
import { updateField } from '../common/actionGenerators';

export const updateEmail =
  (email) => updateField(UPDATE_EMAIL, email);

export const updatePassword =
  (password) => updateField(UPDATE_PASSWORD, password);

export const updateCode =
  (code) => updateField(UPDATE_CODE, code);

export const updateUsername =
  (username) => updateField(UPDATE_USERNAME, username);
