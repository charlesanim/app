import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { HomeEffects } from './home.effects';
import * as HomeActions from './home.actions';

describe('HomeEffects', () => {
  let actions: Observable<any>;
  let effects: HomeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HomeEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(HomeEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HomeActions.init() });

      const expected = hot('-a-|', {
        a: HomeActions.loadHomeSuccess({ home: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
