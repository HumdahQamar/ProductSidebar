import 'react-native';
import React from 'react';
import { Sidebar } from '../src/components/sidebar';

// Note: import explicitly to use the types shipped with jest.
import { it, expect } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Sidebar />);
});
it('renders without crashing', () => {
  const tree = renderer.create(<Sidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the sidebar title', () => {
  const sidebar = renderer.create(<Sidebar />);
  const sidebarInstance = sidebar.root.instance;
  expect(sidebarInstance.props.title).toBe('Sidebar Title');
});

it('renders the sidebar items', () => {
  const sidebar = renderer.create(<Sidebar />);
  const sidebarInstance = sidebar.root.instance;
  expect(sidebarInstance.props.items).toHaveLength(3);
});

it('renders the correct number of sidebar items', () => {
  const sidebar = renderer.create(<Sidebar />);
  const sidebarInstance = sidebar.root.instance;
  expect(sidebarInstance.props.items).toHaveLength(3);
});

it('renders the sidebar items with correct labels', () => {
  const sidebar = renderer.create(<Sidebar />);
  const sidebarInstance = sidebar.root.instance;
  const sidebarItems = sidebarInstance.props.items;
  expect(sidebarItems[0].label).toBe('Item 1');
  expect(sidebarItems[1].label).toBe('Item 2');
  expect(sidebarItems[2].label).toBe('Item 3');
});

it('renders the sidebar items with correct icons', () => {
  const sidebar = renderer.create(<Sidebar />);
  const sidebarInstance = sidebar.root.instance;
  const sidebarItems = sidebarInstance.props.items;
  expect(sidebarItems[0].icon).toBe('icon1');
  expect(sidebarItems[1].icon).toBe('icon2');
  expect(sidebarItems[2].icon).toBe('icon3');
});
