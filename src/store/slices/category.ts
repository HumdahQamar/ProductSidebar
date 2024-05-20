import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategorySliceState } from '../../@types/types';

const initialState: TCategorySliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'Mobile Phones',
        brandIds: [1, 2],
        isSelected: false,
        selectedChildren: [],
      },
      2: {
        id: 2,
        name: 'Watches',
        brandIds: [],
        isSelected: false,
        selectedChildren: [],
      },
      3: {
        id: 3,
        name: 'Laptops',
        brandIds: [3],
        isSelected: false,
        selectedChildren: [],
      },
    },
    ids: [1, 2, 3],
  },
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    updateSelectedCategory: (
      state,
      action: PayloadAction<{ id: number; isSelected: boolean }>,
    ) => {
      const { id, isSelected } = action.payload;
      const item = state.data.byId[id];
      if (item) {
        item.isSelected = isSelected;
      }
    },
    addSelectedCategoryChildren: (
      state,
      action: PayloadAction<{ id: number; brandId: number }>,
    ) => {
      const { id, brandId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren.push(brandId);
        if (item.selectedChildren.length === item.brandIds.length)
          item.isSelected = true;
      }
    },
    removeSelectedCategoryChildren: (
      state,
      action: PayloadAction<{ id: number; brandId: number }>,
    ) => {
      const { id, brandId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren = item.selectedChildren.filter(
          (cId: number) => cId !== brandId,
        );
        if (item.selectedChildren.length <= item.brandIds.length)
          item.isSelected = false;
      }
    },
  },
});

export const {
  setData,
  updateSelectedCategory,
  addSelectedCategoryChildren,
  removeSelectedCategoryChildren,
} = categorySlice.actions;

export const categorySliceReducer = categorySlice.reducer;
