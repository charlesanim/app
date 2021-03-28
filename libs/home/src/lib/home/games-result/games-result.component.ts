/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnInit } from '@angular/core';
import { SearchResponse } from 'libs/data-models';

@Component({
  selector: 'app-games-result',
  templateUrl: './games-result.component.html',
  styleUrls: ['./games-result.component.scss'],
})
export class GamesResultComponent {
  @Input() gameResponse: SearchResponse;
}
