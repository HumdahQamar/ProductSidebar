import React from 'react';
import { FlatList } from 'react-native';
import { flattenData } from '../../store/actions/category';
import { ItemRow } from '../item-row';
import { FlattenedItem } from '../../@types/types';

const renderItem = ({ item }: { item: FlattenedItem }) => {
  return <ItemRow item={item} />;
};

export const Sidebar = () => {
  const data = flattenData();

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.uid.toString()}
      renderItem={renderItem}
    />
  );
};
