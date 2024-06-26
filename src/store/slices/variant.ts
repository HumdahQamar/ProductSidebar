import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TVariantSliceState } from '../../@types/types';

const initialState: TVariantSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        desc: '128 GB - Starlight',
        modelId: 1,
        isSelected: false,
      },
      2: {
        id: 2,
        desc: '128 GB - Midnight',
        modelId: 2,
        isSelected: false,
      },
      3: {
        id: 3,
        desc: '256 GB - Black',
        modelId: 3,
        isSelected: false,
      },
      4: {
        id: 4,
        desc: '16 GB RAM',
        modelId: 4,
        isSelected: false,
      },
      5: {
        id: 5,
        desc: '128 GB - White',
        modelId: 1,
        isSelected: false,
      },
      6: {
        id: 6,
        desc: '256 GB GB - Starlight',
        modelId: 1,
        isSelected: false,
      },
    },
    ids: [1, 2, 3, 4, 5, 6],
  },
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    updateSelectedVariant: (
      state,
      action: PayloadAction<{ id: number; isSelected: boolean }>,
    ) => {
      const { id, isSelected } = action.payload;
      const item = state.data.byId[id];
      if (item) {
        item.isSelected = isSelected;
      }
    },
  },
});

export const { setData, updateSelectedVariant } = brandSlice.actions;

export const variantSliceReducer = brandSlice.reducer;
