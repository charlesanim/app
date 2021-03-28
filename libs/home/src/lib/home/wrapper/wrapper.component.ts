/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  platforms$ = this.authFacade.platforms$;
  loading$ = this.authFacade.loading$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.authFacade.fetchPlatforms();
    this.authFacade.fetchCollection();
  }
}
