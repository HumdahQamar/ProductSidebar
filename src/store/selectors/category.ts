import { ReduxState } from '../../store';

export const selectData = (state: ReduxState) => state.category.data;
