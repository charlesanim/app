/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  collection$ = this.authFacade.collection$;
  submitted = false;
  error$ = this.authFacade.error$;
  loading$ = this.authFacade.loading$;
  removeGameSuccess$ = this.authFacade.removeGameSuccess$;

  constructor(private authFacade: AuthFacade, private _snackBar: MatSnackBar) {
    this.snackBarPopup();
  }

  snackBarPopup(): void {
    if (this.submitted) {
      this._snackBar.open(
        'Failed to remove Game from collection, please try again later',
        'OK',
        {
          duration: 3000,
        }
      );
    }
    if (this.submitted) {
      this._snackBar.open('Game removed from collection', 'OK!', {
        duration: 3000,
      });
    }
  }

  onSubmit(gameId: number) {
    this.submitted = true;
    this.authFacade.removeGame(gameId);
  }

  viewGameDetails(gameId: number) {
    this.authFacade.fetchGameDetails(gameId);
  }
}
