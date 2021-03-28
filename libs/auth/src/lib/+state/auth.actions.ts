/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createAction, props } from '@ngrx/store';
import {
  LoginRequest,
  LoginResponse,
  SearchRequest,
  SearchResponse,
} from 'libs/data-models/models';

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

export const searchGame = createAction(
  '[Home] Search Game',
  props<{ searchRequest: SearchRequest }>()
);

export const searchGameSuccess = createAction(
  '[Home] Search Game Success',
  props<{ searchResponse: SearchResponse[] }>()
);

export const searchGameError = createAction(
  '[Home] Search Game Error',
  props<{ searchError: string | null }>()
);
