import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';
import { TModel } from 'src/@types/types';

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

export const getSelectedModels = createSelector(
  [getModelsByIds, getModelIds],
  (byId, ids) => {
    return ids
      .map((id: number) => byId[id])
      .filter((item: TModel) => item.isSelected);
  },
);
