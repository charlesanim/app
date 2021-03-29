/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '@app/auth';
import { GameDetailsDialogComponent } from 'libs/layout/src/lib/containers/game-details-dialog/game-details-dialog.component';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  collection$ = this.authFacade.collection$;
  submitted = false;
  fetchCollectionError$ = this.authFacade.fetchCollectionError$;
  removeGameError$ = this.authFacade.removeGameError$;
  removeGameSuccess$ = this.authFacade.removeGameSuccess$;
  onDestroy$ = new Subject();
  removeGameScenarioError: HttpErrorResponse | null;
  fetchCollectionScenarioError: HttpErrorResponse | null;
  removeGameScenarioSuccess: boolean;

  constructor(
    private authFacade: AuthFacade,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    combineLatest([
      this.fetchCollectionError$,
      this.removeGameSuccess$,
      this.removeGameError$,
      this.collection$,
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        ([collectionError, removeSuccess, removeError, collectionData]) => {
          if (!collectionData) {
            this.authFacade.fetchCollection();
          }
          this.fetchCollectionScenarioError = collectionError;
          this.removeGameScenarioSuccess = removeSuccess;
          this.removeGameScenarioError = removeError;
          this.snackBarPopup();
        }
      );
  }

  private snackBarPopup(): void {
    if (this.submitted && this.removeGameScenarioError) {
      this._snackBar.open(
        'Failed to remove Game from collection, please try again later',
        'OK',
        {
          duration: 3000,
        }
      );
    }
    if (this.submitted && this.removeGameScenarioSuccess) {
      this._snackBar.open('Game removed from collection', 'OK!', {
        duration: 3000,
      });
    }

    //   reset submitted state
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
  }

  onSubmit(gameId: number) {
    this.submitted = true;
    this.authFacade.removeGame(gameId);
  }

  viewGameDetails(gameId: number) {
    this.authFacade.fetchGameDetails(gameId);
    const dialogRef = this.dialog.open(GameDetailsDialogComponent, {
      width: '500px',
      maxHeight: 700,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //unsubscribe on destroy of component
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
