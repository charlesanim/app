/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../apps/game-platform/src/app/services/auth';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  accessGranted$ = this.authService.accessGranted$;
  collection$ = this.authFacade.collection$;
  user = localStorage.getItem('username');

  constructor(
    private authService: AuthService,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.authFacade.fetchPlatforms();
    this.authFacade.fetchCollection();
  }

  logout() {
    this.authService.logout();
  }
}
