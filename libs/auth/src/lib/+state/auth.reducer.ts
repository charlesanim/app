/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createReducer, on, Action } from '@ngrx/store';
import { LoginResponse } from 'libs/data-models/models';
import { login, loginError, loginSuccess } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loginResponse: LoginResponse | null;
  loading: boolean;
  loginError: any; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  loginResponse: null,
  loading: false,
  loginError: null,
};

const authReducer = createReducer(
  initialState,
  on(login, (state, { loginRequest }) => ({
    ...state,
    loginRequest,
    loading: true,
    loginError: null,
  })),
  on(loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
    loading: false,
    loginError: null,
  })),
  on(loginError, (state, { loginError }) => ({
    ...state,
    loginError,
    loading: false,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
