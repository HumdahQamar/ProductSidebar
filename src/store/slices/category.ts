import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: TCategorySliceState = {
  data: null,
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
