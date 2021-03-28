/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './containers/layout/layout.component';
import { MaterialModule } from '@app/material'; // Added
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthFacade, AuthInterceptor } from '@app/auth';
@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, CommonModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
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
