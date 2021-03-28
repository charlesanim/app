import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { HomeEntity } from './home.models';
import { HomeEffects } from './home.effects';
import { HomeFacade } from './home.facade';

import * as HomeSelectors from './home.selectors';
import * as HomeActions from './home.actions';
import { HOME_FEATURE_KEY, State, initialState, reducer } from './home.reducer';

interface TestSchema {
  home: State;
}

describe('HomeFacade', () => {
  let facade: HomeFacade;
  let store: Store<TestSchema>;
  const createHomeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HomeEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HOME_FEATURE_KEY, reducer),
          EffectsModule.forFeature([HomeEffects]),
        ],
        providers: [HomeFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(HomeFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allHome$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allHome$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadHomeSuccess` to manually update list
     */
    it('allHome$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allHome$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          HomeActions.loadHomeSuccess({
            home: [createHomeEntity('AAA'), createHomeEntity('BBB')],
          })
        );

        list = await readFirst(facade.allHome$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
