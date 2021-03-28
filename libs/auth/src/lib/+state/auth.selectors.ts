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

export const getLoginError = createSelector(
  getAuthState,
  (state: AuthState) => state.loginError
);

export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getSearchGameSuccess = createSelector(
  getAuthState,
  (state: AuthState) => state.searchResponse
);

export const getSearchGameError = createSelector(
  getAuthState,
  (state: AuthState) => state.searchError
);

export const authQuery = {
  getLoading,
  getLoginError,
  getLoginSuccess,
  getSearchGameError,
  getSearchGameSuccess,
};
