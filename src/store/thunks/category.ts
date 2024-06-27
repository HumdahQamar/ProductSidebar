import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';
import { setData, updateSelectedCategory } from '../slices/category';
import { getCategoriesByIds } from '../selectors/category';
import { TObject, IActionOptions } from '../../@types/types';
import {
  CATEGORY_SELECTED_UPDATE,
  CATEGORY_SELECTED_ATTEMPT,
} from '../action-types/category';
import { attemptHandleUpdateSelectedBrand } from './brand';

export const fetchData = () => async (dispatch: AppDispatch) => {
  const data = await new Promise<string>(resolve =>
    setTimeout(() => resolve('Example data'), 1000),
  );
  dispatch(setData(data));
};

export const handleUpdateSelectedCategory = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>(CATEGORY_SELECTED_UPDATE, async (requestParams: TObject, thunkAPI) => {
  try {
    return thunkAPI.dispatch(updateSelectedCategory(requestParams));
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const attemptHandleUpdateSelectedCategory = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>(CATEGORY_SELECTED_ATTEMPT, async (requestParams: TObject, thunkAPI) => {
  try {
    const { id, isSelected } = requestParams;
    const categories: { [key: string]: TObject } = getCategoriesByIds(
      thunkAPI.getState(),
    );
    const category = categories?.[id];
    thunkAPI.dispatch(handleUpdateSelectedCategory(requestParams));
    category.brandIds?.forEach((brandId: number) => {
      thunkAPI.dispatch(
        attemptHandleUpdateSelectedBrand({
          id: brandId,
          isSelected: isSelected,
        }),
      );
    });
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});
