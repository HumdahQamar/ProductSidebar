import React from 'react';
import { ItemRowContainer, SelectedItemsHeader } from './styled';

export const SelectedItems: React.FC = () => {
  // const dispatch = useDispatch();

  return (
    <ItemRowContainer>
      <SelectedItemsHeader>Selected Items</SelectedItemsHeader>
    </ItemRowContainer>
  );
};
