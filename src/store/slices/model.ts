import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TModelSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        name: 'IPhone 14',
        brandId: 1,
        variantIds: [1],
      },
      2: {
        id: 2,
        name: 'IPhone 15 Pro',
        brandId: 1,
        variantIds: [2],
      },
      3: {
        id: 3,
        name: 'Galaxy S22',
        brandId: 2,
        variantIds: [3],
      },
      4: {
        id: 4,
        name: 'ThinkPad',
        brandId: 3,
        variantIds: [1],
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
  },
});

export const { setData } = modelSlice.actions; // TODO: Fix this

export const modelSliceReducer = modelSlice.reducer;
