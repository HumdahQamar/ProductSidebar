import { combineReducers } from '@reduxjs/toolkit';
import { categorySliceReducer } from './category';
import { brandSliceReducer } from './brand';
import { modelSliceReducer } from './model';
import { variantSliceReducer } from './variant';

const rootReducer = combineReducers({
  category: categorySliceReducer,
  brand: brandSliceReducer,
  model: modelSliceReducer,
  variant: variantSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
