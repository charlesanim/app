import { Component } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthFacade, AuthState } from '@app/auth';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AuthState>, private authFacade: AuthFacade) {
    // const res = JSON.parse(localStorage.getItem('accessGranted'));
    // if (res) {
    //   this.authFacade.loginSuccess(res);
    // }
  }
}
