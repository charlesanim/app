/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createReducer, on, Action } from '@ngrx/store';
import {
  LoginResponse,
  SearchRequest,
  SearchResponse,
} from 'libs/data-models/models';
import {
  login,
  loginError,
  loginSuccess,
  searchGame,
  searchGameError,
  searchGameSuccess,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loginResponse: LoginResponse | null;
  loading: boolean;
  loginError: string | null;
  searchRequest: SearchRequest | null;
  searchResponse: SearchResponse[] | null;
  searchError: string | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  loginResponse: null,
  loading: false,
  loginError: null,
  searchRequest: null,
  searchResponse: null,
  searchError: null,
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
  })),
  on(searchGame, (state, { searchRequest }) => ({
    ...state,
    searchRequest,
    loading: true,
    searchError: null,
  })),
  on(searchGameSuccess, (state, { searchResponse }) => ({
    ...state,
    searchResponse,
    loading: null,
    searchError: null,
  })),
  on(searchGameError, (state, { searchError }) => ({
    ...state,
    searchError,
    loading: null,
    searchResponse: null,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
