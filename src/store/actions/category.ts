import { useSelector } from 'react-redux';
import { AppDispatch } from '../index';
import { setData } from '../slices/category';
import { getCategoryData } from '../selectors/category';
import { getBrandData } from '../selectors/brand';
import { getModelData } from '../selectors/model';
import { getVariantsData } from '../selectors/variant';
import { ENTITIES } from '../../constants/entities';
import { FlattenedItem } from '../../@types/types';

export const fetchData = () => async (dispatch: AppDispatch) => {
  const data = await new Promise<string>(resolve =>
    setTimeout(() => resolve('Example data'), 1000),
  );
  dispatch(setData(data));
};

export const flattenData = (): FlattenedItem[] => {
  let uid = 0;
  const categories = useSelector(getCategoryData);
  const brands = useSelector(getBrandData);
  const models = useSelector(getModelData);
  const variants = useSelector(getVariantsData);
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
