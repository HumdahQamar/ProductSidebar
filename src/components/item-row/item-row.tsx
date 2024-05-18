import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  {
    title: 'Main Section 1',
    data: [
      'Item 1-1',
      'Item 1-2',
      {
        subTitle: 'Sub Section 1-1',
        subData: [
          'Item 1-1-1',
          'Item 1-1-2',
          {
            subTitle: 'Sub Section 1-1-1',
            subData: ['Item 1-1-1-1', 'Item 1-1-1-2'],
          },
        ],
      },
    ],
  },
  {
    title: 'Main Section 2',
    data: ['Item 2-1', 'Item 2-2'],
  },
];

const renderItem = ({ item }) => {
  if (typeof item === 'string') {
    return <Text style={styles.item}>{item}</Text>;
  } else if (item.subData) {
    return (
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>{item.subTitle}</Text>
        {item.subData.map((subItem, index) => (
          <View key={index}>{renderItem({ item: subItem })}</View>
        ))}
      </View>
    );
  }
  return null;
};

export const ItemRow = () => (
  <SectionList
    sections={DATA}
    keyExtractor={(item, index) => item + index}
    renderItem={renderItem}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
    )}
  />
);

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    fontSize: 24,
  },
  subSection: {
    paddingLeft: 20,
  },
  subTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

// export default App;
