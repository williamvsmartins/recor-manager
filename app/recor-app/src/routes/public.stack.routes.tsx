import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';


import colors from '../styles/colors';

const StackRoutes = createStackNavigator();

export const PublicRoutes = () => (
  <StackRoutes.Navigator
    
    screenOptions={{
    headerShown: false,
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <StackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />
    <StackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />
  </StackRoutes.Navigator>
)