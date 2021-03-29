/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './containers/games/games.component';
import { MaterialModule } from '@app/material';
import { LayoutModule } from '@app/layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    RouterModule.forChild([{ path: '', component: GamesComponent }]),
  ],
  declarations: [GamesComponent],
})
export class CollectionsModule {}
