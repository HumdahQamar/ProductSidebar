import { css } from 'styled-components';
import { TEntityTypeProps } from 'src/@types/types';
import { ENTITIES } from '../../constants/entities';
import styled from 'styled-components/native';

export const ItemRowContainer = styled.View<TEntityTypeProps>`
  flex-direction: row;

  ${({ type }) =>
    type === ENTITIES.CATEGORY &&
    css`
      padding-top: 15px;
    `}
  ${({ type }) =>
    type === ENTITIES.BRAND &&
    css`
      padding-left: 10px;
    `}
  ${({ type }) =>
    type === ENTITIES.MODEL &&
    css`
      padding-left: 20px;
    `}
  ${({ type }) =>
    type === ENTITIES.VARIANT &&
    css`
      padding-left: 30px;
    `}
`;

export const ItemRowText = styled.Text`
  font-size: 15px;
`;
