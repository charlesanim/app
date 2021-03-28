import { createAction, props } from '@ngrx/store';
import { SearchRequest, SearchResponse } from './home.models';

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
