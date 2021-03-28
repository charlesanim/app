import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_FEATURE_KEY, HomeState, HomePartialState } from './home.reducer';

// Lookup the 'Home' feature state managed by NgRx
export const getHomeState = createFeatureSelector<HomePartialState, HomeState>(
  HOME_FEATURE_KEY
);

export const getSearchGameSuccess = createSelector(
  getHomeState,
  (state: HomeState) => state.searchResponse
);

export const getSearchGameError = createSelector(
  getHomeState,
  (state: HomeState) => state.searchError
);

export const getLoading = createSelector(
  getHomeState,
  (state: HomeState) => state.loading
);

export const authQuery = {
  getLoading,
  getSearchGameError,
  getSearchGameSuccess,
};
