import React from 'react';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { ItemRowContainer, ItemRowText } from './styled';
import { FlattenedItem } from '../../@types/types';
import { ENTITIES } from '../../constants/entities';
import { updateSelectedVariant } from '../../store/slices/variant';
import { updateSelectedModel } from '../../store/slices/model';
import { updateSelectedBrand } from '../../store/slices/brand';
import { updateSelectedCategory } from '../../store/slices/category';

export const ItemRow: React.FC<{ item: FlattenedItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const handleInputChange = (newValue: boolean) => {
    if (item.type === ENTITIES.VARIANT) {
      dispatch(updateSelectedVariant({ id: item.id, isSelected: newValue }));
    } else if (item.type === ENTITIES.MODEL) {
      dispatch(updateSelectedModel({ id: item.id, isSelected: newValue }));
    } else if (item.type === ENTITIES.BRAND) {
      dispatch(updateSelectedBrand({ id: item.id, isSelected: newValue }));
    } else if (item.type === ENTITIES.CATEGORY) {
      dispatch(updateSelectedCategory({ id: item.id, isSelected: newValue }));
    }
  };

  return (
    <ItemRowContainer type={item.type}>
      <CheckBox
        disabled={false}
        value={item.isSelected}
        onValueChange={handleInputChange}
      />
      <ItemRowText>{item.name}</ItemRowText>
    </ItemRowContainer>
  );
};
