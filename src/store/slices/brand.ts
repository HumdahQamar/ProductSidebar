import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: TBrandSliceState = {
  data: null,
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
