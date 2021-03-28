/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'apps/game-platform/src/app/services/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '@app/auth';
import { Store, select } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.accessGranted$.pipe(
      map((res) => {
        if (res) {
          console.log('AuthGaurd Working');
          return true;
        } else {
          this.router.navigate([`/auth/login`]);
          return false;
        }
      })
    );
  }

  // canActivate(): Observable<boolean> {
  //   return this.store.pipe(
  //     select((state) => state.loginResponse),
  //     map((res) => {
  //       if (res) {
  //         return true;
  //       } else {
  //         this.router.navigate([`/auth/login`]);
  //         return false;
  //       }
  //     })
  //   );
  // }
}
