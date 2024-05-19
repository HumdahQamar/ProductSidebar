import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addSelectedCategoryChildren,
  removeSelectedCategoryChildren,
} from '../slices/category';
import { getBrandsByIds } from '../selectors/brand';
import { TObject, IActionOptions } from '../../@types/types';
import { updateSelectedBrand } from '../slices/brand';
import { attemptHandleUpdateSelectedModel } from './model';

export const handleUpdateSelectedBrand = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (requestParams: TObject, thunkAPI) => {
  // TODO: Fix action type
  try {
    thunkAPI.dispatch(updateSelectedBrand(requestParams));
    const { id, isSelected } = requestParams;
    const brands = getBrandsByIds(thunkAPI.getState());
    const brand = brands?.[id];
    console.log('sel', isSelected);
    if (isSelected) {
      return thunkAPI.dispatch(
        addSelectedCategoryChildren({ id: brand.categoryId, brandId: id }),
      );
    } else {
      console.log('isSelected', isSelected, brand.categoryId, id);
      return thunkAPI.dispatch(
        removeSelectedCategoryChildren({ id: brand.categoryId, brandId: id }),
      );
    }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const attemptHandleUpdateSelectedBrand = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (requestParams: TObject, thunkAPI) => {
  // TODO: Fix action type
  try {
    const { id, isSelected } = requestParams;
    const brands = getBrandsByIds(thunkAPI.getState());
    const brand = brands?.[id];
    thunkAPI.dispatch(handleUpdateSelectedBrand(requestParams));
    brand.modelIds?.forEach((modelId: number) => {
      thunkAPI.dispatch(
        attemptHandleUpdateSelectedModel({ id: modelId, isSelected }),
      );
    });
    // }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});
