import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';
import {
  addSelectedCategoryChildren,
  removeSelectedCategoryChildren,
  setData,
  updateSelectedCategory,
} from '../slices/category';
import { getCategoriesByIds, getCategoryData } from '../selectors/category';
import { getBrandData, getBrandsByIds } from '../selectors/brand';
import { getModelData, getModelsByIds } from '../selectors/model';
import { getVariantsByIds, getVariantsData } from '../selectors/variant';
import { FlattenedItem, TObject, IActionOptions } from '../../@types/types';
import {
  addSelectedModelChildren,
  removeSelectedModelChildren,
  updateSelectedModel,
} from '../slices/model';
import { updateSelectedVariant } from '../slices/variant';
import {
  addSelectedBrandChildren,
  removeSelectedBrandChildren,
  updateSelectedBrand,
} from '../slices/brand';
import { ENTITIES } from '../../constants/entities';

export const fetchData = () => async (dispatch: AppDispatch) => {
  const data = await new Promise<string>(resolve =>
    setTimeout(() => resolve('Example data'), 1000),
  );
  dispatch(setData(data));
};

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
      thunkAPI.dispatch(
        addSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    } else {
      thunkAPI.dispatch(
        removeSelectedModelChildren({ id: variant.modelId, variantId: id }),
      );
    }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const handleUpdateSelectedModel = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (payload: TObject, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateSelectedModel(payload));
    const { id, isSelected } = payload;
    const models = getModelsByIds(thunkAPI.getState());
    const model = models?.[id];
    if (isSelected) {
      thunkAPI.dispatch(
        addSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    } else {
      thunkAPI.dispatch(
        removeSelectedBrandChildren({ id: model.brandId, modelId: id }),
      );
    }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

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

export const handleUpdateSelectedCategory = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (requestParams: TObject, thunkAPI) => {
  // TODO: Fix action type
  try {
    thunkAPI.dispatch(updateSelectedCategory(requestParams));
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const attemptHandleUpdateSelectedModel = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (requestParams: TObject, thunkAPI) => {
  try {
    const { id, isSelected } = requestParams;
    const models = getModelsByIds(thunkAPI.getState());
    const variants = getVariantsByIds(thunkAPI.getState());
    const model = models?.[id];
    // if (model) {
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
    // }
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
    // if (brand) {
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

export const attemptHandleUpdateSelectedCategory = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>('model/markSelected', async (requestParams: TObject, thunkAPI) => {
  // TODO: Fix action type
  try {
    const { id, isSelected } = requestParams;
    const categories = getCategoriesByIds(thunkAPI.getState());
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
    // }
  } catch ({ statusText }: TObject) {
    return thunkAPI.rejectWithValue(statusText);
  }
});

export const flattenData = (): FlattenedItem[] => {
  let uid = 0;
  const categories = useSelector(getCategoryData);
  const brands = useSelector(getBrandData);
  const models = useSelector(getModelData);
  const variants = useSelector(getVariantsData);
  const flatData: FlattenedItem[] = [];

  categories?.ids?.forEach((categoryId: number) => {
    const category = categories?.byId?.[categoryId];
    flatData.push({
      ...category,
      uid: uid++,
      id: category.id,
      type: ENTITIES.CATEGORY,
      name: category.name,
    });

    category?.brandIds?.forEach((brandId: number) => {
      const brand = brands?.byId?.[brandId];
      flatData.push({
        ...brand,
        uid: uid++,
        id: brand.id,
        type: ENTITIES.BRAND,
        name: brand?.name,
        parentId: category?.id,
      });

      brand?.modelIds?.forEach((modelId: number) => {
        const model = models?.byId?.[modelId];
        flatData.push({
          ...model,
          uid: uid++,
          id: model.id,
          type: ENTITIES.MODEL,
          name: model?.name,
          parentId: brand?.id,
        });

        model?.variantIds?.forEach((variantId: number) => {
          const variant = variants?.byId?.[variantId];
          flatData.push({
            ...variant,
            uid: uid++,
            type: ENTITIES.VARIANT,
            parentId: model?.id,
            name: variant?.desc,
          });
        });
      });
    });
  });

  return flatData;
};
