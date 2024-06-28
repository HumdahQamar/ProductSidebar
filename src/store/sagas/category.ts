import { put, takeEvery, select } from 'redux-saga/effects';
import { updateSelectedCategory } from '../slices/category';
import { getCategoriesByIds } from '../selectors/category';
import { TObject } from '../../@types/types';
import {
  CATEGORY_SELECTED_UPDATE,
  CATEGORY_SELECTED_ATTEMPT,
  CATEGORY_UPDATE_FAILED,
} from '../action-types/category';
import { BRAND_SELECTED_ATTEMPT } from '../action-types/brand';

function* handleUpdateSelectedCategory(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    return yield put(updateSelectedCategory(payload));
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    return yield put({ type: CATEGORY_UPDATE_FAILED, error: statusText });
  }
}

function* attemptHandleUpdateSelectedCategory(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    const { id, isSelected } = payload;
    const categories = yield select(getCategoriesByIds);
    const category = categories?.[id];
    yield put({
      type: CATEGORY_SELECTED_UPDATE,
      payload,
    });
    if (category.brandIds) {
      for (const brandId of category.brandIds) {
        yield put({
          type: BRAND_SELECTED_ATTEMPT,
          payload: {
            id: brandId,
            isSelected,
          },
        });
      }
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    yield put({ type: CATEGORY_UPDATE_FAILED, error: statusText });
  }
}

export const categorySagas = [
  takeEvery(CATEGORY_SELECTED_UPDATE, handleUpdateSelectedCategory),
  takeEvery(CATEGORY_SELECTED_ATTEMPT, attemptHandleUpdateSelectedCategory),
];
