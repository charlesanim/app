/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import {
  LoginRequest,
  LoginResponse,
  SearchRequest,
  SearchResponse,
} from 'libs/data-models/models';
import {
  login,
  loginSuccess,
  searchGame,
  searchGameSuccess,
} from './auth.actions';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loading$ = this.store$.pipe(select(authQuery.getLoading));
  loginError$ = this.store$.pipe(select(authQuery.getLoginError));
  searchGameError$ = this.store$.pipe(select(authQuery.getSearchGameError));
  searchGame$ = this.store$.pipe(select(authQuery.getSearchGameSuccess));

  searchGame(searchRequest: SearchRequest): void {
    this.store$.dispatch(searchGame({ searchRequest }));
  }

  searchGameSuccess(searchResponse: SearchResponse[]): void {
    this.store$.dispatch(searchGameSuccess({ searchResponse }));
  }
  loginSubmit(loginRequest: LoginRequest): void {
    this.store$.dispatch(login({ loginRequest }));
  }

  loginSuccess(loginResponse: LoginResponse): void {
    this.store$.dispatch(loginSuccess({ loginResponse }));
  }

  constructor(private store$: Store<AuthPartialState>) {}
}
