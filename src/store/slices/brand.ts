import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TBrandSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'Apple',
        modelIds: [1, 2],
      },
      2: {
        id: 2,
        name: 'Samsung',
        modelIds: [3],
      },
      3: {
        id: 3,
        name: 'Lenovo',
        modelIds: [4],
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
  },
});

export const { setData } = brandSlice.actions; // TODO: Fix this

export const brandSliceReducer = brandSlice.reducer;
