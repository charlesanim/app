/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { authRoutes, AuthModule, AuthGuard } from '@app/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@app/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NxModule } from '@nrwl/angular';
import { CollectionsModule } from '@app/collections';
import { HomeModule } from '@app/home';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NxModule.forRoot(),
    LayoutModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {
          path: 'home',
          loadChildren: () =>
            import('@app/home').then((module) => module.HomeModule),
          canActivate: [AuthGuard],
        },
        {
          path: 'collections',
          loadChildren: () =>
            import('@app/collections').then(
              (module) => module.CollectionsModule
            ),
          canActivate: [AuthGuard],
        },
        { path: 'auth', children: authRoutes },
        { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
    AuthModule,
    LayoutModule,
    CollectionsModule,
    HomeModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
