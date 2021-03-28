import { Injectable } from '@angular/core';
import { login } from '@app/auth';
import { authQuery, SearchRequest, SearchResponse } from '@app/home';

import { select, Store, Action } from '@ngrx/store';
import { searchGame, searchGameSuccess } from './home.actions';
import { HomePartialState } from './home.reducer';

@Injectable()
export class HomeFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loading$ = this.store$.pipe(select(authQuery.getLoading));
  searchGameError$ = this.store$.pipe(select(authQuery.getSearchGameError));
  searchGame$ = this.store$.pipe(select(authQuery.getSearchGameSuccess));

  searchGame(searchRequest: SearchRequest): void {
    this.store$.dispatch(searchGame({ searchRequest }));
  }

  searchGameSuccess(searchResponse: SearchResponse[]): void {
    this.store$.dispatch(searchGameSuccess({ searchResponse }));
  }
  constructor(private store$: Store<HomePartialState>) {}
}
