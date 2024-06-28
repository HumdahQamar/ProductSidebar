import { put, select, takeEvery } from 'redux-saga/effects';
import {
  addSelectedCategoryChildren,
  removeSelectedCategoryChildren,
} from '../slices/category';
import { getBrandsByIds } from '../selectors/brand';
import { TObject } from '../../@types/types';
import { updateSelectedBrand } from '../slices/brand';
import {
  BRAND_SELECTED_UPDATE,
  BRAND_SELECTED_ATTEMPT,
  BRAND_UPDATE_FAILED,
} from '../action-types/brand';

function* handleUpdateSelectedBrand(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    yield put(updateSelectedBrand(payload));
    const { id, isSelected } = payload;

    const brands = yield select(getBrandsByIds);
    const brand = brands?.[id];
    if (isSelected) {
      return yield put(
        addSelectedCategoryChildren({ id: brand.categoryId, brandId: id }),
      );
    } else {
      return yield put(
        removeSelectedCategoryChildren({ id: brand.categoryId, brandId: id }),
      );
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    return yield put({ type: BRAND_UPDATE_FAILED, error: statusText });
  }
}

function* attemptHandleUpdateSelectedBrand(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    const { id, isSelected } = payload;
    const brands = yield select(getBrandsByIds);
    const brand = brands?.[id];
    yield put({
      type: BRAND_SELECTED_UPDATE,
      payload,
    });
    if (brand.modelIds) {
      for (const modelId of brand.modelIds) {
        yield put({
          type: BRAND_SELECTED_UPDATE,
          payload: { id: modelId, isSelected },
        });
      }
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    yield put({ type: BRAND_UPDATE_FAILED, error: statusText });
  }
}

export const brandSagas = [
  takeEvery(BRAND_SELECTED_UPDATE, handleUpdateSelectedBrand),
  takeEvery(BRAND_SELECTED_ATTEMPT, attemptHandleUpdateSelectedBrand),
];
