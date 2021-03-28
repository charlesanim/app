/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@app/auth';
import { SearchRequest } from 'libs/data-models';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  platforms$ = this.authFacade.platforms$;
  loading$ = this.authFacade.loading$;
  searchGame$ = this.authFacade.searchGame$;
  collection$ = this.authFacade.collection$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.authFacade.fetchPlatforms();
    this.authFacade.fetchCollection();
  }

  onSearchGames(searchRequest: SearchRequest) {
    this.authFacade.searchGame(searchRequest);
  }
  onAddGame(gameId: number) {
    this.authFacade.addToCollection(gameId);
  }
}
