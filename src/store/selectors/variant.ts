import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';
import { TVariant } from 'src/@types/types';

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

export const getSelectedVariants = createSelector(
  [getVariantsByIds, getVariantIds],
  (byId, ids) => {
    return ids
      .map((id: number) => byId[id])
      .filter((item: TVariant) => item.isSelected);
  },
);
