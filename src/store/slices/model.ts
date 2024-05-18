import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TModelSliceState = {
  data: null,
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
