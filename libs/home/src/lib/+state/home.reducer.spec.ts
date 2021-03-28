import { HomeEntity } from './home.models';
import * as HomeActions from './home.actions';
import { State, initialState, reducer } from './home.reducer';

describe('Home Reducer', () => {
  const createHomeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HomeEntity);

  beforeEach(() => {});

  describe('valid Home actions', () => {
    it('loadHomeSuccess should return set the list of known Home', () => {
      const home = [
        createHomeEntity('PRODUCT-AAA'),
        createHomeEntity('PRODUCT-zzz'),
      ];
      const action = HomeActions.loadHomeSuccess({ home });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
