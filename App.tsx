import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { LandingScreen } from './src/screens/landing-screen';
import { store } from './src/store';

const App = () => {
  return (
    <ReduxStoreProvider store={store}>
      <LandingScreen />
    </ReduxStoreProvider>
  );
};

export default App;
