import get from 'lodash.get';
import { createSelector } from 'reselect';
import { TReduxState } from '../../store';
import { TBrand } from 'src/@types/types';

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

export const getSelectedBrands = createSelector(
  [getBrandsByIds, getBrandIds],
  (byId, ids) => {
    return ids
      .map((id: number) => byId[id])
      .filter((item: TBrand) => item.isSelected);
  },
);
