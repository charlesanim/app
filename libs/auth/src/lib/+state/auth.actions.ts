/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from 'libs/data-models/models';

export const login = createAction(
  '[Auth] Login',
  props<{ loginRequest: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginResponse: LoginResponse }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ loginError: any }>()
);

export const logOut = createAction('[Auth] Log Out');
