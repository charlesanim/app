/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'libs/data-models/models';
import { AuthFacade } from '../../+state/auth.facade';
import { AuthService } from '../../../../../../apps/game-platform/src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loading$ = this.authFacade.loading$;
  loginError$ = this.authFacade.error$;
  constructor(private authFacade: AuthFacade) {}

  login(authenticate: LoginRequest): void {
    this.authFacade.loginSubmit(authenticate);
  }
}
