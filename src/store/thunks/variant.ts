import { createAsyncThunk } from '@reduxjs/toolkit';
import { getVariantsByIds } from '../selectors/variant';
import { TObject, IActionOptions } from '../../@types/types';
import {
  addSelectedModelChildren,
  removeSelectedModelChildren,
} from '../slices/model';
import { updateSelectedVariant } from '../slices/variant';

export const handleUpdateSelectedVariant = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (payload: TObject, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateSelectedVariant(payload));
    const { id, isSelected } = payload;
    const variants = getVariantsByIds(thunkAPI.getState());
    const variant = variants?.[id];
    if (isSelected) {
      return thunkAPI.dispatch(
        addSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    } else {
      return thunkAPI.dispatch(
        removeSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});
