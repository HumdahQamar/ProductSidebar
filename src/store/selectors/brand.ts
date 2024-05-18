import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';

const baseSelector = (state: TReduxState) => state.brand;

export const getBrandData = createSelector(baseSelector, brand =>
  get(brand, 'data', {}),
);

export const getBrandsByIds = createSelector(baseSelector, brand =>
  get(brand, 'data.byId', {}),
);

export const getBrandIds = createSelector(baseSelector, brand =>
  get(brand, 'data.ids', []),
);
