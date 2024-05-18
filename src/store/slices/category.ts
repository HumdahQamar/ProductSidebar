import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TCategorySliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'Mobile Phones',
        brandIds: [1, 2],
      },
      2: {
        id: 2,
        name: 'Watches',
        brandIds: [],
      },
      3: {
        id: 3,
        name: 'Laptops',
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
