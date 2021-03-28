import { createReducer, on, Action } from '@ngrx/store';
import { searchGame, SearchRequest, SearchResponse } from '@app/home';
import { searchGameError, searchGameSuccess } from './home.actions';

export const HOME_FEATURE_KEY = 'home';

export interface HomeState {
  searchRequest: SearchRequest | null; // which Home record has been selected
  searchResponse: SearchResponse[] | null;
  loading: boolean; // has the Home list been loaded
  searchError: string | null; // last known error (if any)
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: HomeState;
}

export const initialState: HomeState = {
  // set initial required properties
  loading: false,
  searchRequest: null,
  searchResponse: null,
  searchError: null,
};

const homeReducer = createReducer(
  initialState,
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

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
