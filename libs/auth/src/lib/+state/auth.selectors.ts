import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthPartialState, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, AuthState>(
  AUTH_FEATURE_KEY
);

export const getLoginSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.loginResponse
);

export const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getSearchGameSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.searchResponse
);
export const getPlatforms = createSelector(
  getAuthState,
  (state: AuthState) => state.platforms
);
export const getGameDetails = createSelector(
  getAuthState,
  (state: AuthState) => state.gameDetails
);
export const getCollection = createSelector(
  getAuthState,
  (state: AuthState) => state.collection
);

export const authQuery = {
  getLoading,
  getError,
  getLoginSuccess,
  getSearchGameSuccess,
  getPlatforms,
  getGameDetails,
  getCollection,
};
