/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../apps/game-platform/src/app/services/auth';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  accessGranted$ = this.authService.accessGranted$;
  username$ = this.authService.username$;
  collection$ = this.authFacade.collection$;
  constructor(
    private authService: AuthService,
    private authFacade: AuthFacade
  ) {}

  logout() {
    this.authService.logout();
  }
}
