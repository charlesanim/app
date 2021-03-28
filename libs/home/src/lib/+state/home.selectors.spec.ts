import { HomeEntity } from './home.models';
import { State, homeAdapter, initialState } from './home.reducer';
import * as HomeSelectors from './home.selectors';

describe('Home Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHomeId = (it) => it['id'];
  const createHomeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HomeEntity);

  let state;

  beforeEach(() => {
    state = {
      home: homeAdapter.setAll(
        [
          createHomeEntity('PRODUCT-AAA'),
          createHomeEntity('PRODUCT-BBB'),
          createHomeEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Home Selectors', () => {
    it('getAllHome() should return the list of Home', () => {
      const results = HomeSelectors.getAllHome(state);
      const selId = getHomeId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = HomeSelectors.getSelected(state);
      const selId = getHomeId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getHomeLoaded() should return the current 'loaded' status", () => {
      const result = HomeSelectors.getHomeLoaded(state);

      expect(result).toBe(true);
    });

    it("getHomeError() should return the current 'error' state", () => {
      const result = HomeSelectors.getHomeError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
