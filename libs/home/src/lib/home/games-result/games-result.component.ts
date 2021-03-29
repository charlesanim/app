/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '@app/auth';
import { Collection, SearchResponse } from 'libs/data-models';

@Component({
  selector: 'app-games-result',
  templateUrl: './games-result.component.html',
  styleUrls: ['./games-result.component.scss'],
})
export class GamesResultComponent {
  @Input() gameResponse: SearchResponse[];
  @Input() collection: Collection[] = [];
  @Input() error: any;
  @Input() addCollectionSuccess = false;
  @Output() addGame = new EventEmitter<number>();
  @Output() viewGame = new EventEmitter<number>();

  collection$ = this.authFacade.collection$;
  isAvailable: boolean;
  submitted = false;

  constructor(private authFacade: AuthFacade, private _snackBar: MatSnackBar) {
    this.snackBarPopup();
  }

  snackBarPopup(): void {
    if (this.error && this.submitted) {
      this._snackBar.open(
        'Failed to add to collection, please try again later',
        'OK',
        {
          duration: 3000,
        }
      );
    }
    if (this.addCollectionSuccess) {
      this._snackBar.open('Game added to collection', 'OK!', {
        duration: 3000,
      });
    }
  }

  onSubmit(gameId: number) {
    this.submitted = true;
    //find platform Number of selected platform name
    this.isAvailable =
      this.collection.filter((o) => o.gameId === gameId).length > 0;

    if (!this.isAvailable) {
      this.addGame.emit(gameId);
    } else {
      this._snackBar.open('Game already in collection', 'OK!', {
        duration: 3000,
      });
    }
  }

  viewGameDetails(gameId: number) {
    this.viewGame.emit(gameId);
  }
}
