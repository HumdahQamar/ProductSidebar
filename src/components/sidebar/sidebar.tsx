import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { flattenData } from '../../store/thunks/category';
import { ItemRow } from '../item-row';
import { FlattenedItem } from '../../@types/types';
import { SelectedItems } from '../selected-items';

const renderItem = ({ item }: { item: FlattenedItem }) => {
  return <ItemRow item={item} />;
};

const renderFooter = () => {
  return <SelectedItems />;
};

export const Sidebar = () => {
  const data = flattenData();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={data}
        keyExtractor={item => item.uid.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        scrollEnabled
      />
    </ScrollView>
  );
};
