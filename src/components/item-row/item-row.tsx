import React from 'react';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { ItemRowContainer, ItemRowText } from './styled';
import { FlattenedItem } from '../../@types/types';
import { ENTITIES } from '../../constants/entities';
import { VARIANT_SELECTED_UPDATE } from '../../store/action-types/variant';
import { MODEL_SELECTED_ATTEMPT } from '../../store/action-types/model';
import { BRAND_SELECTED_ATTEMPT } from '../../store/action-types/brand';
import { CATEGORY_SELECTED_ATTEMPT } from '../../store/action-types/category';

export const ItemRow: React.FC<{ item: FlattenedItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const handleInputChange = (newValue: boolean) => {
    const requestParams = { id: item.id, isSelected: newValue };
    if (item.type === ENTITIES.VARIANT) {
      dispatch({
        type: VARIANT_SELECTED_UPDATE,
        payload: requestParams,
      });
    } else if (item.type === ENTITIES.MODEL) {
      dispatch({
        type: MODEL_SELECTED_ATTEMPT,
        payload: requestParams,
      });
    } else if (item.type === ENTITIES.BRAND) {
      dispatch({
        type: BRAND_SELECTED_ATTEMPT,
        payload: requestParams,
      });
    } else if (item.type === ENTITIES.CATEGORY) {
      dispatch({
        type: CATEGORY_SELECTED_ATTEMPT,
        payload: requestParams,
      });
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
