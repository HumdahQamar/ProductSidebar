import React from 'react';
import { ChipWrapper, ChipText } from './styled';

export const Chip: React.FC<{ name: string }> = ({ name }) => {
  return (
    <ChipWrapper>
      <ChipText>{name}</ChipText>
    </ChipWrapper>
  );
};
