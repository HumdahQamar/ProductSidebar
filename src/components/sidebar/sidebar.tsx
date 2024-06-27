/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { FlatList } from 'react-native';
import { ItemRow } from '../item-row';
import { FlattenedItem } from '../../@types/types';
import { SelectedItems } from '../selected-items';
import { SidebarContainer } from './styled';
import { flattenData } from '../../utils/flatten-data';
import { useSelector } from 'react-redux';
import { getCategoryData } from '../../store/selectors/category';
import { getBrandData } from '../../store/selectors/brand';
import { getModelData } from '../../store/selectors/model';
import { getVariantsData } from '../../store/selectors/variant';

const renderItem = ({ item }: { item: FlattenedItem }) => {
  return <ItemRow item={item} />;
};

const renderFooter = () => {
  return <SelectedItems />;
};

export const Sidebar: React.FC = () => {
  const categories = useSelector(getCategoryData);
  const brands = useSelector(getBrandData);
  const models = useSelector(getModelData);
  const variants = useSelector(getVariantsData);

  // @ts-ignore
  const data = flattenData(categories, brands, models, variants);

  return (
    <SidebarContainer>
      <FlatList
        data={data}
        keyExtractor={item => item.uid.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        scrollEnabled
      />
    </SidebarContainer>
  );
};
