import { AppDispatch } from '../index';
import { setData } from '../slices/category';

export const fetchData = () => async (dispatch: AppDispatch) => {
  const data = await new Promise<string>(resolve =>
    setTimeout(() => resolve('Example data'), 1000),
  );
  dispatch(setData(data));
};
