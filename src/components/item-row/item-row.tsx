import React from 'react';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { ItemRowContainer, ItemRowText } from './styled';
import { FlattenedItem } from '../../@types/types';
import { ENTITIES } from '../../constants/entities';
import {
  attemptHandleUpdateSelectedBrand,
  attemptHandleUpdateSelectedCategory,
  attemptHandleUpdateSelectedModel,
  handleUpdateSelectedVariant,
} from '../../store/actions/category';

export const ItemRow: React.FC<{ item: FlattenedItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const handleInputChange = (newValue: boolean) => {
    const requestParams = { id: item.id, isSelected: newValue };
    if (item.type === ENTITIES.VARIANT) {
      dispatch(handleUpdateSelectedVariant(requestParams));
    } else if (item.type === ENTITIES.MODEL) {
      dispatch(attemptHandleUpdateSelectedModel(requestParams));
    } else if (item.type === ENTITIES.BRAND) {
      dispatch(attemptHandleUpdateSelectedBrand(requestParams));
    } else if (item.type === ENTITIES.CATEGORY) {
      dispatch(attemptHandleUpdateSelectedCategory(requestParams));
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
