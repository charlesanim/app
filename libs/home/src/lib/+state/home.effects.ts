import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as HomeFeature from './home.reducer';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HomeActions.loadHomeSuccess({ home: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return HomeActions.loadHomeFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
