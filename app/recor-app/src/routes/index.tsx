import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Load } from '../components/Load';
import { PublicRoutes } from './public.stack.routes';
import { PrivateRoutes } from './private.stack.routes';

import { AuthProvider } from '../contexts/AuthContext';

import { useAuth } from '../hooks/useAuth';

export const Routes = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Load />
  }

  return (
    <NavigationContainer>
          {isAuth ? <PrivateRoutes /> : <PublicRoutes />  }
    </NavigationContainer>
  )
}