import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@app/auth';

@Component({
  selector: 'app-game-details-dialog',
  templateUrl: './game-details-dialog.component.html',
  styleUrls: ['./game-details-dialog.component.scss'],
})
export class GameDetailsDialogComponent implements OnInit {
  gameDetails$ = this.authFacade.gameDetails$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}
}
