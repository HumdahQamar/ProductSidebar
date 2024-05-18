import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';

const baseSelector = (state: TReduxState) => state.variant;

export const getVariantsData = createSelector(baseSelector, variant =>
  get(variant, 'data', {}),
);

export const getVariantsByIds = createSelector(baseSelector, variant =>
  get(variant, 'data.byId', {}),
);

export const getVariantIds = createSelector(baseSelector, variant =>
  get(variant, 'data.ids', []),
);
