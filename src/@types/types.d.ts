import { ENTITIES } from './src/constants/entities';

type TObject = Record<
  string,
  isTypeNumber,
  isTypeString,
  isTypeFunction,
  isTypeUndefined,
  isTypeBoolen
>;

type TCategory = {
  id: number;
  name: string;
  brandIds: number[];
  isSelected: boolean;
  selectedChildren: number[];
};

type TBrand = {
  id: number;
  categoryId: number;
  name: string;
  isSelected: boolean;
  modelIds: number[];
  selectedChildren: number[];
};

type TModel = {
  id: number;
  brandId: number;
  name: string;
  isSelected: boolean;
  variantIds: number[];
  selectedChildren: number[];
};

type TVariant = {
  id: number;
  modelId: number;
  name?: string;
  desc?: string;
  isSelected: boolean;
};

interface TCategoryData {
  ids: number[];
  byId: Record<TCategory>;
}

interface TBrandData {
  ids: number[];
  byId: Record<TBrand>;
}

interface TModelData {
  ids: number[];
  byId: Record<TModel>;
}

interface TVariantData {
  ids: number[];
  byId: Record<TVariant>;
}

interface TCategorySliceState {
  data: TCategoryData | null;
}

interface TBrandSliceState {
  data: TBrandData | null;
}

interface TModelSliceState {
  data: TModelData | null;
}

interface TVariantSliceState {
  data: TVariantData | null;
}

interface TEntityTypeProps {
  type: ENTITIES.CATEGORY | ENTITIES.BRAND | ENTITIES.MODEL | ENTITIES.VARIANT;
}

interface IActionOptions {
  dispatch?: TDispatch;
  state: TReduxState;
}

interface FlattenedItem {
  uid: number;
  id: number;
  type: 'category' | 'brand' | 'model' | 'variant';
  name?: string;
  storage?: string;
  isSelected?: boolean;
  attribute?: string;
  value?: number | string;
  parentId?: number;
}
