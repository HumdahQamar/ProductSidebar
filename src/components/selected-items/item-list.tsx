import React from 'react';

import { ItemRowContainer, SelectedItemsHeader } from './styled';
import { Chip } from '../chip';

export const SelectedItems: React.FC = () => {
  return (
    <ItemRowContainer>
      <SelectedItemsHeader>Selected Items</SelectedItemsHeader>
      <Chip name="Brand 1" />
    </ItemRowContainer>
  );
};
