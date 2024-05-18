import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TVariantSliceState = {
  data: {
    byId: {
      1: {
        id: 1,
        desc: '128 GB - Starlight',
        modelId: 1,
      },
      2: {
        id: 2,
        desc: '128 GB - Midnight',
        modelId: 2,
      },
      3: {
        id: 3,
        desc: '256 GB - Black',
        modelId: 3,
      },
      4: {
        id: 4,
        desc: '16 GB RAM',
        modelId: 4,
      },
      5: {
        id: 5,
        desc: '128 GB - White',
        modelId: 1,
      },
    },
    ids: [1, 2, 3, 4, 5],
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

export const variantSliceReducer = brandSlice.reducer;
