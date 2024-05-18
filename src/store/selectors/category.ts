import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';

const baseSelector = (state: TReduxState) => state.category;

export const getCategoryData = createSelector(baseSelector, category =>
  get(category, 'data', {}),
);

export const getCategoriesByIds = createSelector(baseSelector, category =>
  get(category, 'data.byId', {}),
);

export const getCategoryIds = createSelector(baseSelector, category =>
  get(category, 'data.ids', []),
);
