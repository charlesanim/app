/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createReducer, on, Action } from '@ngrx/store';
import {
  Collection,
  GameDetails,
  LoginResponse,
  Platforms,
  SearchRequest,
  SearchResponse,
} from 'libs/data-models/models';
import {
  addToCollection,
  addToCollectionError,
  addToCollectionSuccess,
  fetchCollection,
  fetchCollectionError,
  fetchCollectionSuccess,
  fetchGameDetails,
  fetchGameDetailsError,
  fetchGameDetailsSuccess,
  fetchPlatforms,
  fetchPlatformsError,
  fetchPlatformsSuccess,
  login,
  loginError,
  loginSuccess,
  removeGame,
  removeGameError,
  removeGameSuccess,
  searchGame,
  searchGameError,
  searchGameSuccess,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loginResponse: LoginResponse | null;
  loading: boolean;
  searchRequest: SearchRequest | null;
  searchResponse: SearchResponse[] | null;
  platforms: Platforms[] | null;
  error: string | null;
  collection: Collection[] | null;
  gameDetails: GameDetails[] | null;
  addCollectionSuccess: boolean;
  removeGameSuccess: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  loginResponse: null,
  loading: false,
  error: null,
  searchRequest: null,
  searchResponse: null,
  platforms: null,
  collection: null,
  gameDetails: null,
  addCollectionSuccess: false,
  removeGameSuccess: false,
};

const authReducer = createReducer(
  initialState,
  on(login, (state, { loginRequest }) => ({
    ...state,
    loginRequest,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
    loading: false,
    error: null,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(searchGame, (state, { searchRequest }) => ({
    ...state,
    searchRequest: null,
    loading: true,
    error: null,
  })),
  on(searchGameSuccess, (state, { searchResponse }) => ({
    ...state,
    searchResponse,
    loading: false,
    error: null,
  })),
  on(searchGameError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    searchResponse: null,
  })),
  on(fetchPlatforms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fetchPlatformsSuccess, (state, { platforms }) => ({
    ...state,
    platforms,
    loading: false,
    error: null,
  })),
  on(fetchPlatformsError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    platforms: null,
  })),
  on(fetchGameDetails, (state, { gameId }) => ({
    ...state,
    loading: true,
    error: null,
    gameDetails: [],
  })),
  on(fetchGameDetailsSuccess, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    loading: false,
    error: null,
  })),
  on(fetchGameDetailsError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    gameDetails: null,
  })),
  on(fetchCollection, (state) => ({
    ...state,
    loading: true,
    error: null,
    collection: [],
  })),
  on(fetchCollectionSuccess, (state, { collection }) => ({
    ...state,
    collection,
    loading: false,
    error: null,
  })),
  on(fetchCollectionError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    collection: null,
  })),
  on(addToCollection, (state, { gameId }) => ({
    ...state,
    loading: true,
    error: null,
    addCollectionSuccess: false,
  })),
  on(addToCollectionSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    addCollectionSuccess: true,
  })),
  on(addToCollectionError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    addCollectionSuccess: false,
  })),
  on(removeGame, (state, { gameId }) => ({
    ...state,
    loading: true,
    error: null,
    removeGameSuccess: false,
    collection: state.collection.filter((v) => v.gameId !== gameId),
  })),
  on(removeGameSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    removeGameSuccess: true,
  })),
  on(removeGameError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    removeGameSuccess: false,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
