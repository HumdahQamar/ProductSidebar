import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CartItemCountText } from './styled';
import { selectData } from '../../store/selectors/category';

export const Sidebar: FC = () => {
  const data = useSelector(selectData);
  console.log(data);

  return <CartItemCountText>LALA</CartItemCountText>;
};
