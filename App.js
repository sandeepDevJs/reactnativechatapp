import React from 'react';
import {NativeBaseProvider} from 'native-base';

import Routes from './src/routes';

const App = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};
export default App;
