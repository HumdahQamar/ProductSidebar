import { TEntityTypeProps } from 'src/@types/types';
import { ENTITIES } from '../../constants/entities';
import styled from 'styled-components/native';

export const ItemRowContainer = styled.View<TEntityTypeProps>`
  flex-direction: row;
  padding-top: ${({ type }) => (type === ENTITIES.CATEGORY ? '15px' : '0')};
  padding-left: ${({ type }) => {
    if (type === ENTITIES.BRAND) return '10px';
    else if (type === ENTITIES.MODEL) return '20px';
    else if (type === ENTITIES.VARIANT) return '30px';
    return '0';
  }};
`;

export const ItemRowText = styled.Text`
  font-size: 15px;
`;
