import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { ItemRowContainer, ItemRowText } from './styled';
import { FlattenedItem } from '../../@types/types';

export const ItemRow: React.FC<{ item: FlattenedItem }> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ItemRowContainer type={item.type}>
      <CheckBox
        disabled={false}
        value={item.isSelected}
        onValueChange={newValue => setIsChecked(newValue)}
      />
      <ItemRowText>{item.name}</ItemRowText>
    </ItemRowContainer>
  );
};
