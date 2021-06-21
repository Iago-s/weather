import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';
import Search from './src/pages/Search';

const Tabs = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Search" component={Search} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
