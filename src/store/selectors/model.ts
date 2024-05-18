import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';

const baseSelector = (state: TReduxState) => state.model;

export const getModelData = createSelector(baseSelector, model =>
  get(model, 'data', {}),
);

export const getModelsByIds = createSelector(baseSelector, model =>
  get(model, 'data.byId', {}),
);

export const getModelIds = createSelector(baseSelector, model =>
  get(model, 'data.ids', []),
);
