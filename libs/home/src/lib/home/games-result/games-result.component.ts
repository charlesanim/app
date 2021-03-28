/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '@app/auth';
import { Collection, SearchResponse } from 'libs/data-models';

@Component({
  selector: 'app-games-result',
  templateUrl: './games-result.component.html',
  styleUrls: ['./games-result.component.scss'],
})
export class GamesResultComponent {
  @Input() gameResponse: SearchResponse;
  @Input() collection: Collection[] = [];
  @Output() addGame = new EventEmitter<number>();

  collection$ = this.authFacade.collection$;
  isAvailable: boolean;
  errMsg: string;

  constructor(private authFacade: AuthFacade, private _snackBar: MatSnackBar) {}

  onSubmit(gameId: number) {
    //find platform Number of selected platform name
    this.isAvailable =
      this.collection.filter((o) => o.gameId === gameId).length > 0;

    if (!this.isAvailable) {
      this.addGame.emit(gameId);
      //TODO: Handle edge cases
      this._snackBar.open('Game added to collection', 'Gotcha!', {
        duration: 2000,
      });
    } else {
      this._snackBar.open('Game already in collection', 'Gotcha!', {
        duration: 2000,
      });
    }
  }
}
