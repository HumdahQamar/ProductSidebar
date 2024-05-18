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
};

type TBrand = {
  id: number;
  categoryId: number;
  name: string;
};

type TModel = {
  id: number;
  brandId: number;
  name: string;
};

type TVariant = {
  id: number;
  modelId: number;
  name: string;
  isSelected: boolean;
};

interface TCategorySliceState {
  data: Record<TCategory> | null;
}

interface TBrandSliceState {
  data: Record<TBrand> | null;
}

interface TModelSliceState {
  data: Record<TModel> | null;
}

interface TVariantSliceState {
  data: Record<TVariant> | null;
}

interface TEntityTypeProps {
  type: ENTITIES.CATEGORY | ENTITIES.BRAND | ENTITIES.MODEL | ENTITIES.VARIANT;
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
