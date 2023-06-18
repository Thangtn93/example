/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import NavigationContainer from './src/navigation/NavigationContainer';
import RootNavigator from './src/navigation/RootNavigator';
// import {Provider as PaperProvider} from 'react-native-paper';
import {defaultTheme} from './theme';

const App = (): JSX.Element => {
  return (
    // <PaperProvider theme={defaultTheme}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer theme={defaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    // </PaperProvider>
  );
};

export default App;
