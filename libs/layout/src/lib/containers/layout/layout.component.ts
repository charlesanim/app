/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { AuthService } from '../../../../../../apps/game-platform/src/app/services/auth';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  accessGranted$ = this.authService.accessGranted$;
  collection$ = this.authFacade.collection$;
  username$ = this.authService.username$;

  constructor(
    private authService: AuthService,
    private authFacade: AuthFacade
  ) {}

  logout() {
    this.authService.logout();
    this.authFacade.resetState();
  }
}
