import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TModelSliceState } from '../../@types/types';

const initialState: TModelSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'IPhone 14',
        brandId: 1,
        variantIds: [1, 6],
        isSelected: false,
        selectedChildren: [],
      },
      2: {
        id: 2,
        name: 'IPhone 15 Pro',
        brandId: 1,
        variantIds: [2],
        isSelected: false,
        selectedChildren: [],
      },
      3: {
        id: 3,
        name: 'Galaxy S22',
        brandId: 2,
        variantIds: [3],
        isSelected: false,
        selectedChildren: [],
      },
      4: {
        id: 4,
        name: 'ThinkPad',
        brandId: 3,
        variantIds: [4],
        isSelected: false,
        selectedChildren: [],
      },
    },
    ids: [1, 2, 3, 4],
  },
};

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    updateSelectedModel: (
      state,
      action: PayloadAction<{ id: number; isSelected: boolean }>,
    ) => {
      const { id, isSelected } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.isSelected = isSelected;
      }
    },
    addSelectedModelChildren: (
      state,
      action: PayloadAction<{ id: number; variantId: number }>,
    ) => {
      const { id, variantId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren.push(variantId);
        if (item.selectedChildren.length === item.variantIds.length)
          item.isSelected = true;
      }
    },
    removeSelectedModelChildren: (
      state,
      action: PayloadAction<{ id: number; variantId: number }>,
    ) => {
      const { id, variantId } = action.payload;
      const item = state.data?.byId?.[id];
      if (item) {
        item.selectedChildren = item.selectedChildren.filter(
          (cId: number) => cId !== variantId,
        );
        if (item.selectedChildren.length <= item.variantIds.length)
          item.isSelected = false;
      }
    },
  },
});

export const {
  setData,
  updateSelectedModel,
  addSelectedModelChildren,
  removeSelectedModelChildren,
} = modelSlice.actions; // TODO: Fix this

export const modelSliceReducer = modelSlice.reducer;
