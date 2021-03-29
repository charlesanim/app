/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { LoginRequest, SearchRequest } from 'libs/data-models/models';
import {
  addToCollection,
  fetchCollection,
  fetchGameDetails,
  fetchPlatforms,
  login,
  removeGame,
  searchGame,
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
  error$ = this.store$.pipe(select(authQuery.getError));
  searchGame$ = this.store$.pipe(select(authQuery.getSearchGameSuccess));
  platforms$ = this.store$.pipe(select(authQuery.getPlatforms));
  gameDetails$ = this.store$.pipe(select(authQuery.getGameDetails));
  collection$ = this.store$.pipe(select(authQuery.getCollection));
  addCollectionSuccess$ = this.store$.pipe(
    select(authQuery.addCollectionSuccess)
  );
  removeGameSuccess$ = this.store$.pipe(select(authQuery.removeGameSuccess));

  searchGame(searchRequest: SearchRequest): void {
    this.store$.dispatch(searchGame({ searchRequest }));
  }

  loginSubmit(loginRequest: LoginRequest): void {
    this.store$.dispatch(login({ loginRequest }));
  }

  fetchPlatforms(): void {
    this.store$.dispatch(fetchPlatforms());
  }

  fetchGameDetails(gameId: number): void {
    this.store$.dispatch(fetchGameDetails({ gameId }));
  }

  fetchCollection(): void {
    this.store$.dispatch(fetchCollection());
  }

  addToCollection(gameId: number): void {
    this.store$.dispatch(addToCollection({ gameId }));
  }

  removeGame(gameId: number): void {
    this.store$.dispatch(removeGame({ gameId }));
  }

  constructor(private store$: Store<AuthPartialState>) {}
}
