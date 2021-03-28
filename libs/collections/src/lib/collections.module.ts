import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './containers/games/games.component';
import { MaterialModule } from '@app/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: GamesComponent }]),
  ],
  declarations: [GamesComponent],
})
export class CollectionsModule {}
