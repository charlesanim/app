/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { MaterialModule } from '@app/material'; // Added
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthFacade, AuthInterceptor } from '@app/auth';
import { GameDetailsDialogComponent } from './containers/game-details-dialog/game-details-dialog.component';
@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, CommonModule],
  declarations: [LayoutComponent, GameDetailsDialogComponent],
  exports: [LayoutComponent, GameDetailsDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthFacade,
  ],
})
export class LayoutModule {}
