/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './home/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthFacade, AuthInterceptor } from '@app/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '@app/auth';
import { AuthEffects } from '@app/auth';
import { WrapperComponent } from './home/wrapper/wrapper.component';
import { GamesResultComponent } from './home/games-result/games-result.component';

import { LayoutModule } from '@app/layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WrapperComponent },
    ]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [WrapperComponent, SearchComponent, GamesResultComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthFacade,
  ],
})
export class HomeModule {}
