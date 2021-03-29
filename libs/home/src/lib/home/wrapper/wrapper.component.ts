/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@app/auth';
import { SearchRequest } from 'libs/data-models';
import { GameDetailsDialogComponent } from 'libs/layout/src/lib/containers/game-details-dialog/game-details-dialog.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  platforms$ = this.authFacade.platforms$;
  loading$ = this.authFacade.loading$;
  searchGame$ = this.authFacade.searchGame$;
  collection$ = this.authFacade.collection$;
  addToCollectionError$ = this.authFacade.addToCollectionError$;
  searchGameError$ = this.authFacade.searchGameError$;
  addToCollectionSuccess$ = this.authFacade.addToCollectionSuccess$;

  constructor(private authFacade: AuthFacade, public dialog: MatDialog) {}

  onSearchGames(searchRequest: SearchRequest) {
    this.authFacade.searchGame(searchRequest);
  }
  onAddGame(gameId: number) {
    this.authFacade.addToCollection(gameId);
  }
  onViewGame(gameId: number) {
    this.authFacade.fetchGameDetails(gameId);
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(GameDetailsDialogComponent, {
      width: '500px',
      maxHeight: 700,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
