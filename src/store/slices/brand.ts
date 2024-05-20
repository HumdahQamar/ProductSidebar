import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBrandSliceState } from '../../@types/types';

const initialState: TBrandSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'Apple',
        categoryId: 1,
        modelIds: [1, 2],
        isSelected: false,
        selectedChildren: [],
      },
      2: {
        id: 2,
        name: 'Samsung',
        categoryId: 1,
        modelIds: [3],
        isSelected: false,
        selectedChildren: [],
      },
      3: {
        id: 3,
        name: 'Lenovo',
        categoryId: 3,
        modelIds: [4],
        isSelected: false,
        selectedChildren: [],
      },
    },
    ids: [1, 2, 3],
  },
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    updateSelectedBrand: (
      state,
      action: PayloadAction<{ id: number; isSelected: boolean }>,
    ) => {
      const { id, isSelected } = action.payload;
      const item = state.data.byId[id];
      if (item) {
        item.isSelected = isSelected;
      }
    },
    addSelectedBrandChildren: (
      state,
      action: PayloadAction<{ id: number; modelId: number }>,
    ) => {
      const { id, modelId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren.push(modelId);
        if (item.selectedChildren.length === item.modelIds.length)
          item.isSelected = true;
      }
    },
    removeSelectedBrandChildren: (
      state,
      action: PayloadAction<{ id: number; modelId: number }>,
    ) => {
      const { id, modelId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren = item.selectedChildren.filter(
          (cId: number) => cId !== modelId,
        );
        if (item.selectedChildren.length <= item.modelIds.length)
          item.isSelected = false;
      }
    },
  },
});

export const {
  setData,
  updateSelectedBrand,
  addSelectedBrandChildren,
  removeSelectedBrandChildren,
} = brandSlice.actions;

export const brandSliceReducer = brandSlice.reducer;
