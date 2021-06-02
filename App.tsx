import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import AddMemoryButton from './src/components/AddMemoryButton';
import Header from './src/components/Header';
import Memories from './src/components/Memories';
import { ThemeContext } from './src/services/ThemeContext';
import { ThemeEnum } from './src/services/ThemeEnum';
import { ThemeStorage } from './src/services/ThemeStorage';

const DATA = [
  {
    id: '1',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '2',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '3',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '10',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '20',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '30',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '100',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '200',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '300',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
];

export default function App() {
  const { themeStorage } = App.dependencies;
  const [theme, setTheme] = React.useState(ThemeEnum.Light);

  useEffect(setThemeStateFromLocalStorage, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View>
        <StatusBar barStyle='default' />
        <Header></Header>
        <Memories memories={DATA}></Memories>
        <AddMemoryButton></AddMemoryButton>
      </View>
    </ThemeContext.Provider>
  );

  function setThemeStateFromLocalStorage() {
    themeStorage.isDark().then((isDark) => setTheme(isDark ? ThemeEnum.Dark : ThemeEnum.Light));
  }
}

App.dependencies = {
  themeStorage: ThemeStorage.getInstance(),
};
