import React from 'react';
import { FlatList } from 'react-native';
import { ItemRowContainer, SelectedItemsHeader } from './styled';
import { Chip } from '../chip';
import { useSelector } from 'react-redux';
import { getSelectedVariants } from '../../store/selectors/variant';
import { getModelsByIds } from '../../store/selectors/model';
import { TObject, TVariant } from 'src/@types/types';
import { getBrandsByIds } from '../../store/selectors/brand';
import { getCategoriesByIds } from '../..//store/selectors/category';
import { ENTITIES } from '../../constants/entities';

const renderItem = ({ item }: { item: TObject }) => {
  return <Chip name={item.name} />;
};

export const SelectedItems: React.FC = () => {
  const selectedVariants = useSelector(getSelectedVariants);
  const models = useSelector(getModelsByIds);
  const brands = useSelector(getBrandsByIds);
  const categories = useSelector(getCategoriesByIds);

  const prepareVariants = () => {
    const data: TObject[] = [];
    let count = 0;

    selectedVariants.forEach((variant: TVariant) => {
      const model = models[variant.modelId];
      const brand = brands[model.brandId];
      const category = categories[brand.categoryId];
      if (category?.isSelected) {
        if (
          !data.some(
            item => item.type === ENTITIES.CATEGORY && item.id === category.id,
          )
        ) {
          data.push({
            uid: count++,
            id: category.id,
            name: `All ${category.name} devices`,
            type: ENTITIES.CATEGORY,
          });
        }
      } else if (brand?.isSelected) {
        if (
          !data.some(
            item => item.type === ENTITIES.BRAND && item.id === brand.id,
          )
        ) {
          data.push({
            uid: count++,
            id: brand.id,
            name: `All ${brand.name} devices`,
            type: ENTITIES.BRAND,
          });
        }
      } else if (model?.isSelected) {
        if (
          !data.some(
            item => item.type === ENTITIES.MODEL && item.id === model.id,
          )
        ) {
          data.push({
            uid: count++,
            id: model.id,
            name: `All ${model.name} devices`,
            type: ENTITIES.MODEL,
          });
        }
      } else {
        data.push({
          uid: count++,
          id: variant.id,
          name: `${model.name} ${variant.desc}`,
        });
      }
    });
    return data;
  };

  return (
    <ItemRowContainer>
      <SelectedItemsHeader>Selected Items</SelectedItemsHeader>
      <FlatList
        data={prepareVariants()}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
        scrollEnabled
        numColumns={1}
      />
    </ItemRowContainer>
  );
};
