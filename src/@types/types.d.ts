type TCategory = {
  id: number;
  name: string;
}

type TBrand = {
  id: number;
  categoryId: number;
  name: string;
}

type TModel = {
  id: number;
  brandId: number;
  name: string;
}

type TVariant = {
  id: number;
  modelId: number;
  name: string;
  isSelected: boolean;
}

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