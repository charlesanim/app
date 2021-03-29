/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './containers/games/games.component';
import * as fromAuth from '@app/auth';
import { MaterialModule } from '@app/material';
import { LayoutModule } from '@app/layout';
import { AuthEffects, AuthFacade } from '@app/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GamesComponent },
    ]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [GamesComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromAuth.AuthInterceptor,
      multi: true,
    },
    AuthFacade,
  ],
})
export class CollectionsModule {}
