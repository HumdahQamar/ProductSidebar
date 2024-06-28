import { put, select, takeEvery } from 'redux-saga/effects';
import {
  VARIANT_SELECTED_UPDATE,
  VARIANT_UPDATE_FAILED,
} from '../action-types/variant';
import {
  addSelectedModelChildren,
  removeSelectedModelChildren,
} from '../slices/model';
import { updateSelectedVariant } from '../slices/variant';
import { getVariantsByIds } from '../selectors/variant';
import { TObject } from 'src/@types/types';

function* handleUpdateSelectedVariant(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    yield put(updateSelectedVariant(payload));
    const { id, isSelected } = payload;

    const variants = yield select(getVariantsByIds);
    const variant = variants?.[id];

    if (isSelected) {
      yield put(
        addSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    } else {
      yield put(
        removeSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    yield put({ type: VARIANT_UPDATE_FAILED, error: statusText });
  }
}

export const variantSagas = [
  takeEvery(VARIANT_SELECTED_UPDATE, handleUpdateSelectedVariant),
];
