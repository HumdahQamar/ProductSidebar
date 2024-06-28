import { all } from 'redux-saga/effects';
import { variantSagas } from './variant';
import { modelSagas } from './model';
import { brandSagas } from './brand';
import { categorySagas } from './category';

export default function* rootSaga() {
  yield all([...variantSagas]);
  yield all([...modelSagas]);
  yield all([...brandSagas]);
  yield all([...categorySagas]);
}
