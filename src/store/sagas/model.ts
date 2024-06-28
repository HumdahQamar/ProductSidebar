import { put, select, takeEvery } from 'redux-saga/effects';
import { getModelsByIds } from '../selectors/model';
import { getVariantsByIds } from '../selectors/variant';
import { TObject } from '../../@types/types';
import { updateSelectedModel } from '../slices/model';
import {
  addSelectedBrandChildren,
  removeSelectedBrandChildren,
} from '../slices/brand';
import {
  MODEL_SELECTED_UPDATE,
  MODEL_SELECTED_ATTEMPT,
  MODEL_UPDATE_FAILED,
} from '../action-types/model';
import { VARIANT_SELECTED_UPDATE } from '../action-types/variant';

function* handleUpdateSelectedModel(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    yield put(updateSelectedModel(payload));
    const { id, isSelected } = payload;

    const models = yield select(getModelsByIds);
    const model = models?.[id];

    if (isSelected) {
      return yield put(
        addSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    } else {
      return yield put(
        removeSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    return yield put({ type: MODEL_UPDATE_FAILED, error: statusText });
  }
}

function* attemptHandleUpdateSelectedModel(
  action: TObject,
): Generator<TObject, void, TObject> {
  try {
    const { payload } = action;
    const { id, isSelected } = payload;
    const models = yield select(getModelsByIds);
    const variants = yield select(getVariantsByIds);
    const model = models?.[id];
    yield put({
      type: MODEL_SELECTED_UPDATE,
      payload,
    });
    if (model.variantIds) {
      for (const variantId of model.variantIds) {
        const variant = variants?.[variantId];
        if (variant) {
          yield put({
            type: VARIANT_SELECTED_UPDATE,
            payload: {
              id: variantId,
              isSelected,
            },
          });
        }
      }
    }
  } catch (error: TObject) {
    const statusText = error.statusText || 'Unknown error';
    yield put({ type: MODEL_UPDATE_FAILED, error: statusText });
  }
}

export const modelSagas = [
  takeEvery(MODEL_SELECTED_UPDATE, handleUpdateSelectedModel),
  takeEvery(MODEL_SELECTED_ATTEMPT, attemptHandleUpdateSelectedModel),
];
