import { createAsyncThunk } from '@reduxjs/toolkit';
import { getModelsByIds } from '../selectors/model';
import { getVariantsByIds } from '../selectors/variant';
import { TObject, IActionOptions } from '../../@types/types';
import { updateSelectedModel } from '../slices/model';
import {
  addSelectedBrandChildren,
  removeSelectedBrandChildren,
} from '../slices/brand';
import {
  MODEL_SELECTED_UPDATE,
  MODEL_SELECTED_ATTEMPT,
} from '../action-types/model';
import { handleUpdateSelectedVariant } from './variant';

export const handleUpdateSelectedModel = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>(MODEL_SELECTED_UPDATE, async (payload: TObject, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateSelectedModel(payload));
    const { id, isSelected } = payload;
    const models = getModelsByIds(thunkAPI.getState());
    const model = models?.[id];
    if (isSelected) {
      return thunkAPI.dispatch(
        addSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    } else {
      return thunkAPI.dispatch(
        removeSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const attemptHandleUpdateSelectedModel = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>(MODEL_SELECTED_ATTEMPT, async (requestParams: TObject, thunkAPI) => {
  try {
    const { id, isSelected } = requestParams;
    const models = getModelsByIds(thunkAPI.getState());
    const variants = getVariantsByIds(thunkAPI.getState());
    const model = models?.[id];
    thunkAPI.dispatch(handleUpdateSelectedModel(requestParams));
    model.variantIds?.forEach((variantId: number) => {
      const variant = variants?.[variantId];
      if (variant) {
        thunkAPI.dispatch(
          handleUpdateSelectedVariant({
            id: variantId,
            isSelected,
          }),
        );
      }
    });
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});
