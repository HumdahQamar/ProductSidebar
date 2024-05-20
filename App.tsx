import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LandingScreen } from './src/screens';
import { store } from './src/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
    borderColor: 'black',
    borderWidth: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ReduxStoreProvider store={store}>
        <LandingScreen />
      </ReduxStoreProvider>
    </SafeAreaView>
  );
};

export default App;
