import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategorySliceState } from '../../@types/types';

const initialState: TCategorySliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'Mobile Phones',
        brandIds: [1, 2],
        isSelected: true,
      },
      2: {
        id: 2,
        name: 'Watches',
        brandIds: [],
        isSelected: false,
      },
      3: {
        id: 3,
        name: 'Laptops',
        brandIds: [3],
        isSelected: false,
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
  },
});

export const { setData } = categorySlice.actions; // TODO: Fix this

export const categorySliceReducer = categorySlice.reducer;
