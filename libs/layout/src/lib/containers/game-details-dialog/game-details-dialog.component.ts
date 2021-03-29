import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-game-details-dialog',
  templateUrl: './game-details-dialog.component.html',
  styleUrls: ['./game-details-dialog.component.scss'],
})
export class GameDetailsDialogComponent {
  gameDetails$ = this.authFacade.gameDetails$;
  loading$ = this.authFacade.loading$;
  fetchGameDetailsError$ = this.authFacade.fetchGameDetailsError$;
  constructor(private authFacade: AuthFacade) {}
}
