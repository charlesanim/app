import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
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
import {
  catchError,
  isEmpty,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from 'apps/game-platform/src/app/services/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {
  submitLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ loginRequest }) =>
        this.authService.login(loginRequest).pipe(
          map((loginResponse) =>
            loginSuccess({
              loginResponse,
            })
          ),
          catchError((err) => of(loginError({ error: err })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((data) => {
          if (data.loginResponse.token) {
            this.router.navigate(['/home']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  searchGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchGame),
      switchMap(({ searchRequest }) =>
        this.authService.searchGame(searchRequest).pipe(
          map((searchResponse) =>
            searchGameSuccess({
              searchResponse,
            })
          ),
          catchError((err) => of(searchGameError({ error: err })))
        )
      )
    )
  );

  fetchPlatforms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPlatforms),
      withLatestFrom(this.authFacade.platforms$), //check if platforms data is available
      switchMap(([, platFormsData]) => {
        // if its not, make the api call
        if (platFormsData === null) {
          return this.authService.fetchPlatforms().pipe(
            map((platforms) =>
              fetchPlatformsSuccess({
                platforms,
              })
            ),
            catchError((err) => of(fetchPlatformsError({ error: err })))
          );
        }
      })
    )
  );

  fetchGameDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGameDetails),
      switchMap(({ gameId }) =>
        this.authService.fetchGameDetails(gameId).pipe(
          map((gameDetails) =>
            fetchGameDetailsSuccess({
              gameDetails,
            })
          ),
          catchError((err) => of(fetchGameDetailsError({ error: err })))
        )
      )
    )
  );

  fetchCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCollection),
      switchMap(() =>
        this.authService.fetchCollection().pipe(
          map((collection) =>
            fetchCollectionSuccess({
              collection,
            })
          ),
          catchError((err) => of(fetchCollectionError({ error: err })))
        )
      )
    )
  );

  addToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCollection),
      switchMap(({ gameId }) =>
        this.authService.addToCollection(gameId).pipe(
          map(
            () => addToCollectionSuccess(),
            this.authFacade.fetchCollection() //onSuccess of Adding to collections, call api so we can update the count badge
          ),
          catchError((err) => of(addToCollectionError({ error: err })))
        )
      )
    )
  );

  removeGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeGame),
      switchMap(({ gameId }) =>
        this.authService.removeGame(gameId).pipe(
          map(() => removeGameSuccess()),
          catchError((err) => of(removeGameError({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private authFacade: AuthFacade
  ) {}
}
