import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ClassSelect } from "../pages/ClassSelect";
import { MyClass } from "../pages/MyClass";
import { MyStudents } from "../pages/MyStudents";
import { MyFrequence } from "../pages/MyFrequence";
import { Confirmation } from '../pages/Confirmation';

import colors from '../styles/colors';

const StackRoutes = createStackNavigator();


export const PrivateRoutes  = () => (
  <StackRoutes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <StackRoutes.Screen name="ClassSelect" component={ClassSelect} />
    <StackRoutes.Screen name="MyClass" component={MyClass} />

    <StackRoutes.Screen name="MyStudents" component={MyStudents} />
    <StackRoutes.Screen name="MyFrequence" component={MyFrequence} />
    <StackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />
  </StackRoutes.Navigator>
);

