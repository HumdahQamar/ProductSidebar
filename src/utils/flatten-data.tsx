import {
  FlattenedItem,
  TBrandData,
  TCategoryData,
  TModelData,
  TVariantData,
} from '../@types/types';
import { ENTITIES } from '../constants/entities';

export const flattenData = (
  categories: TCategoryData,
  brands: TBrandData,
  models: TModelData,
  variants: TVariantData,
): FlattenedItem[] => {
  let uid = 0;
  const flatData: FlattenedItem[] = [];

  categories?.ids?.forEach((categoryId: number) => {
    const category = categories?.byId?.[categoryId];
    flatData.push({
      ...category,
      uid: uid++,
      id: category.id,
      type: ENTITIES.CATEGORY,
      name: category.name,
    });

    category?.brandIds?.forEach((brandId: number) => {
      const brand = brands?.byId?.[brandId];
      flatData.push({
        ...brand,
        uid: uid++,
        id: brand.id,
        type: ENTITIES.BRAND,
        name: brand?.name,
        parentId: category?.id,
      });

      brand?.modelIds?.forEach((modelId: number) => {
        const model = models?.byId?.[modelId];
        flatData.push({
          ...model,
          uid: uid++,
          id: model.id,
          type: ENTITIES.MODEL,
          name: model?.name,
          parentId: brand?.id,
        });

        model?.variantIds?.forEach((variantId: number) => {
          const variant = variants?.byId?.[variantId];
          flatData.push({
            ...variant,
            uid: uid++,
            type: ENTITIES.VARIANT,
            parentId: model?.id,
            name: variant?.desc,
          });
        });
      });
    });
  });

  return flatData;
};
