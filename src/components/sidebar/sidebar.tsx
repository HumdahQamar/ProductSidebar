import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CartItemCountText } from './styled';
import { selectData } from '../../store/selectors/category';
import { Chip } from '@rneui/themed';
import { ItemRow } from '../item-row';

export const Sidebar: FC = () => {
  const data = useSelector(selectData);
  console.log(data);

  return (
    <>
      <ItemRow />
      <Chip
        title="Left Icon Chip"
        icon={{
          name: 'bluetooth',
          type: 'font-awesome',
          size: 20,
          color: 'white',
        }}
        // onPressIcon={() => console.log('Icon pressed')}
        containerStyle={{ marginVertical: 15 }}
      />
      <CartItemCountText>LALA</CartItemCountText>
    </>
  );
};
