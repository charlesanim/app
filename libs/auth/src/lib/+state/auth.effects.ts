import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { login, loginError, loginSuccess } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from 'apps/game-platform/src/app/services/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

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
          catchError((err) => of(loginError({ loginError: err })))
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
